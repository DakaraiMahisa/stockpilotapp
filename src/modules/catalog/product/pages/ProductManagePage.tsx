import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import { Button, Card, Input, Modal } from "@/components/ui";
import EmptyState from "@/components/feedback/EmptyState";
import Skeleton from "@/components/feedback/Skeleton";
import PageHeader from "@/components/common/PageHeader";

import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import {
  useActivateProduct,
  useCreateProduct,
  useDeactivateProduct,
  useProducts,
  useUpdateProduct,
} from "../hooks/useProduct";

import { useCategoryTree } from "@/modules/catalog/category/hooks/useCategory";
import { useActiveBrands } from "@/modules/catalog/brand/hooks/useBrand";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import ProductToolbar from "../components/ProductToolbar";

import ProductVariantSection from "@/modules/catalog/product-variant/components/ProductVariantSection";
import { useResolvePrice } from "@/modules/catalog/pricing/hooks/useResolvePrice";
import PriceResolutionDisplay from "@/modules/catalog/pricing/components/PriceResolutionDisplay";
import type { PriceResolveResponse } from "@/modules/catalog/pricing/types/pricing.types";
import type {
  Product,
  ProductCreateRequest,
  ProductListParams,
  ProductUpdateRequest,
} from "../types/product.types";

import type {
  ProductCreateFormValues,
  ProductUpdateFormValues,
} from "../schema/product.schemas";

import { notifier } from "@/lib/notifications/notifier";

const PAGE_SIZE = 20;

const ProductManagePage = () => {
  const { hasPermission } = usePermissions();

  const canRead = hasPermission(PERMISSIONS.PRODUCTS_READ);
  const canCreate = hasPermission(PERMISSIONS.PRODUCTS_CREATE);
  const canUpdate = hasPermission(PERMISSIONS.PRODUCTS_UPDATE);
  const canReadVariants = hasPermission(PERMISSIONS.PRODUCT_VARIANT_READ);
  const canResolvePrice = hasPermission(PERMISSIONS.CATALOG_PRICING_READ);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [active, setActive] = useState("");

  const [page, setPage] = useState(0);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [deactivateProduct, setDeactivateProduct] = useState<Product | null>(
    null,
  );

  const [variantProduct, setVariantProduct] = useState<Product | null>(null);
  const [priceProduct, setPriceProduct] = useState<Product | null>(null);
  const [priceQuantity, setPriceQuantity] = useState("1");
  const [priceResult, setPriceResult] = useState<PriceResolveResponse | null>(
    null,
  );

  const resolvePrice = useResolvePrice();
  /*
   * Build the API parameters only from active filters.
   */
  const listParams = useMemo<ProductListParams>(() => {
    const params: ProductListParams = {
      page,
      size: PAGE_SIZE,
      sort: ["name,asc"],
    };

    if (search.trim()) {
      params.search = search.trim();
    }

    if (categoryId) {
      params.categoryId = categoryId;
    }

    if (brandId) {
      params.brandId = brandId;
    }

    if (active === "true") {
      params.active = true;
    }

    if (active === "false") {
      params.active = false;
    }

    return params;
  }, [search, categoryId, brandId, active, page]);

  const {
    data: productResponse,
    isLoading: productsLoading,
    isError: productsError,
  } = useProducts(listParams);

  const { data: categoryResponse } = useCategoryTree();
  const { data: brandResponse } = useActiveBrands();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deactivateProductMutation = useDeactivateProduct();
  const activateProductMutation = useActivateProduct();

  /*
   * Reset pagination whenever the filtering criteria changes.
   */
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setPage(0);
  };

  const handleBrandChange = (value: string) => {
    setBrandId(value);
    setPage(0);
  };

  const handleResolvePrice = (product: Product) => {
    setPriceProduct(product);
    setPriceQuantity("1");
    setPriceResult(null);
  };

  const handleSubmitPriceResolution = async () => {
    if (!priceProduct) {
      return;
    }

    const quantity = Number(priceQuantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      notifier.error("Quantity must be greater than 0.");
      return;
    }

    try {
      const response = await resolvePrice.mutateAsync({
        productId: priceProduct.id,
        quantity,
      });

      setPriceResult(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ??
            "Unable to resolve the product price.",
        );
      } else {
        notifier.error("An unexpected error occurred.");
      }
    }
  };

  const handleActiveChange = (value: string) => {
    setActive(value);
    setPage(0);
  };
  const products = productResponse?.data?.content ?? [];
  const pagination = productResponse?.data;

  const categories = categoryResponse?.data ?? [];
  const brands = brandResponse?.data ?? [];

  const handleCreate = () => {
    if (!canCreate) {
      return;
    }

    setSelectedProduct(null);
    setFormMode("create");
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    if (!canUpdate) {
      return;
    }

    setSelectedProduct(product);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleManageVariants = (product: Product) => {
    setVariantProduct(product);
  };

  const handleCloseForm = () => {
    if (createProduct.isPending || updateProduct.isPending) {
      return;
    }

    setFormOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (
    values: ProductCreateFormValues | ProductUpdateFormValues,
  ) => {
    try {
      if (formMode === "create") {
        if (!canCreate) {
          return;
        }

        await createProduct.mutateAsync(values as ProductCreateRequest);

        notifier.success("Product created successfully.");
      } else {
        if (!canUpdate || !selectedProduct) {
          return;
        }

        await updateProduct.mutateAsync({
          productId: selectedProduct.id,
          request: values as ProductUpdateRequest,
        });

        notifier.success("Product updated successfully.");
      }

      setFormOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ?? "Unable to save the product.",
        );
      } else {
        notifier.error("An unexpected error occurred.");
      }
    }
  };

  const handleDeactivate = (product: Product) => {
    if (!canUpdate) {
      return;
    }

    setDeactivateProduct(product);
  };

  const handleConfirmDeactivate = async () => {
    if (!canUpdate || !deactivateProduct) {
      return;
    }

    try {
      await deactivateProductMutation.mutateAsync(deactivateProduct.id);

      notifier.success("Product deactivated successfully.");
      setDeactivateProduct(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ?? "Unable to deactivate the product.",
        );
      } else {
        notifier.error("An unexpected error occurred.");
      }
    }
  };

  const handleActivate = async (product: Product) => {
    if (!canUpdate) {
      return;
    }

    try {
      await activateProductMutation.mutateAsync(product.id);

      notifier.success("Product activated successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ?? "Unable to activate the product.",
        );
      } else {
        notifier.error("An unexpected error occurred.");
      }
    }
  };

  if (!canRead) {
    return <Navigate to="/dashboard" replace />;
  }

  if (productsLoading && !productResponse) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (productsError || !productResponse?.data) {
    return (
      <EmptyState
        title="Unable to load products"
        description="Please refresh the page or try again later."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage products, inventory settings, and catalog information."
      >
        {canCreate && <Button onClick={handleCreate}>Create Product</Button>}
      </PageHeader>
      <Card>
        <ProductToolbar
          search={search}
          categoryId={categoryId}
          brandId={brandId}
          active={active}
          categories={categories}
          brands={brands}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onActiveChange={handleActiveChange}
        />
      </Card>
      <ProductTable
        products={products}
        isLoading={false}
        canManageVariants={canReadVariants}
        canResolvePrice={canResolvePrice}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        onActivate={handleActivate}
        onManageVariants={handleManageVariants}
        onResolvePrice={handleResolvePrice}
      />
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Showing{" "}
            <span className="font-medium text-text-primary">
              {pagination.numberOfElements}
            </span>{" "}
            of{" "}
            <span className="font-medium text-text-primary">
              {pagination.totalElements}
            </span>{" "}
            products
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.first}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>

            <span className="px-2 text-sm text-text-secondary">
              Page {pagination.number + 1} of {pagination.totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={pagination.last}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      <Modal
        open={formOpen}
        onClose={handleCloseForm}
        title={formMode === "create" ? "Create Product" : "Edit Product"}
        size="xl"
      >
        <ProductForm
          mode={formMode}
          product={selectedProduct}
          isSubmitting={createProduct.isPending || updateProduct.isPending}
          onSubmit={handleSubmit}
          onCancel={handleCloseForm}
        />
      </Modal>
      <Modal
        open={Boolean(variantProduct)}
        onClose={() => setVariantProduct(null)}
        title={
          variantProduct
            ? `Variants — ${variantProduct.name}`
            : "Product Variants"
        }
        size="xl"
      >
        {variantProduct && (
          <ProductVariantSection productId={variantProduct.id} />
        )}
      </Modal>

      <Modal
        open={Boolean(priceProduct)}
        onClose={() => {
          if (!resolvePrice.isPending) {
            setPriceProduct(null);
            setPriceResult(null);
          }
        }}
        title={
          priceProduct
            ? `Resolve Price — ${priceProduct.name}`
            : "Resolve Price"
        }
        size="xl"
      >
        <div className="space-y-6">
          <div>
            <p className="text-sm text-text-secondary">
              Resolve the effective selling price using the configured pricing
              rules for this product.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                Product
              </p>
              <p className="mt-1 text-sm font-medium text-text-primary">
                {priceProduct?.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                SKU
              </p>
              <p className="mt-1 font-mono text-sm text-text-primary">
                {priceProduct?.sku}
              </p>
            </div>
          </div>

          <div className="max-w-xs">
            <Input
              label="Quantity"
              type="number"
              min="0.001"
              step="0.001"
              value={priceQuantity}
              onChange={(event) => {
                setPriceQuantity(event.target.value);
                setPriceResult(null);
              }}
              disabled={resolvePrice.isPending}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setPriceProduct(null);
                setPriceResult(null);
              }}
              disabled={resolvePrice.isPending}
            >
              Close
            </Button>

            <Button
              loading={resolvePrice.isPending}
              onClick={handleSubmitPriceResolution}
            >
              Resolve Price
            </Button>
          </div>

          <PriceResolutionDisplay result={priceResult} />
        </div>
      </Modal>

      <Modal
        open={Boolean(deactivateProduct)}
        onClose={() => {
          if (!deactivateProductMutation.isPending) {
            setDeactivateProduct(null);
          }
        }}
        title="Deactivate Product"
        size="sm"
      >
        <div className="space-y-6">
          <p className="text-sm text-text-secondary">
            Are you sure you want to deactivate{" "}
            <span className="font-medium text-text-primary">
              {deactivateProduct?.name}
            </span>
            ? The product will no longer be active in the catalog, but its
            product record and existing data will be retained.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setDeactivateProduct(null)}
              disabled={deactivateProductMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              loading={deactivateProductMutation.isPending}
              onClick={handleConfirmDeactivate}
            >
              Deactivate
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductManagePage;
