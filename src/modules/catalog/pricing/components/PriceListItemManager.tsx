import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import EmptyState from "@/components/feedback/EmptyState";
import Skeleton from "@/components/feedback/Skeleton";
import Modal from "@/components/ui/Modal";
import {
  Badge,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import {
  useDeletePriceListItem,
  usePriceListItems,
  useUpsertPriceListItems,
} from "../hooks/usePriceLists";
import { useProducts } from "../../product/hooks/useProduct";
import { useProductVariants } from "../../product-variant/hooks/useProductVariant";
import type { Product } from "../../product/types/product.types";
import type { ProductVariant } from "../../product-variant/types/productVariant.types";
import type {
  PriceList,
  PriceListItem,
  PriceListItemRequest,
} from "../types/priceList.types";

interface PriceListItemManagerProps {
  priceList: PriceList;
}

interface PriceFormState {
  productId: string;
  variantId: string;
  minQuantity: string;
  unitPrice: string;
  discountPct: string;
}

const EMPTY_FORM: PriceFormState = {
  productId: "",
  variantId: "",
  minQuantity: "1",
  unitPrice: "",
  discountPct: "0",
};

const PriceListItemManager = ({ priceList }: PriceListItemManagerProps) => {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission(PERMISSIONS.CATALOG_PRICING_CREATE);
  const canUpdate = hasPermission(PERMISSIONS.CATALOG_PRICING_UPDATE);
  const canDelete = hasPermission(PERMISSIONS.CATALOG_PRICING_DELETE);

  const {
    data: itemsResponse,
    isLoading,
    isError,
  } = usePriceListItems(priceList.id);

  const deletePriceListItem = useDeletePriceListItem();
  const upsertPriceListItems = useUpsertPriceListItems();

  const items = itemsResponse?.data ?? [];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PriceListItem | null>(null);
  const [form, setForm] = useState<PriceFormState>(EMPTY_FORM);

  const [productSearch, setProductSearch] = useState("");

  const { data: productsResponse, isLoading: isProductsLoading } = useProducts({
    search: productSearch.trim() || undefined,
    active: true,
    page: 0,
    size: 10,
    sort: ["name,asc"],
  });

  const products = useMemo(
    () => productsResponse?.data?.content ?? [],
    [productsResponse?.data?.content],
  );

  const { data: variantsResponse, isLoading: isVariantsLoading } =
    useProductVariants(form.productId);

  const variants = useMemo(
    () => variantsResponse?.data ?? [],
    [variantsResponse?.data],
  );

  const selectedProduct = useMemo<Product | undefined>(
    () => products.find((product) => product.id === form.productId),
    [products, form.productId],
  );

  const selectedVariant = useMemo<ProductVariant | undefined>(
    () => variants.find((variant) => variant.id === form.variantId),
    [variants, form.variantId],
  );

  const openCreateForm = () => {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setProductSearch("");
    setIsFormOpen(true);
  };

  const openEditForm = (item: PriceListItem) => {
    setEditingItem(item);
    setProductSearch("");
    setForm({
      productId: item.productId,
      variantId: item.variantId ?? "",
      minQuantity: String(item.minQuantity),
      unitPrice: String(item.unitPrice),
      discountPct: String(item.discountPct ?? 0),
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (upsertPriceListItems.isPending) {
      return;
    }

    setIsFormOpen(false);
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setProductSearch("");
  };

  const updateField = (field: keyof PriceFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleProductSelect = (product: Product) => {
    setForm((current) => ({
      ...current,
      productId: product.id,
      variantId: "",
    }));

    setProductSearch(product.name);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.productId) {
      window.alert("Please select a product.");
      return;
    }

    const minQuantity = Number(form.minQuantity);
    const unitPrice = Number(form.unitPrice);
    const discountPct =
      form.discountPct.trim() === "" ? 0 : Number(form.discountPct);

    if (!Number.isFinite(minQuantity) || minQuantity <= 0) {
      window.alert("Minimum quantity must be greater than 0.");
      return;
    }

    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      window.alert("Unit price must be 0 or greater.");
      return;
    }

    if (!Number.isFinite(discountPct) || discountPct < 0 || discountPct > 100) {
      window.alert("Discount must be between 0 and 100.");
      return;
    }

    const request: PriceListItemRequest = {
      productId: form.variantId ? undefined : form.productId,
      variantId: form.variantId || undefined,
      minQuantity,
      unitPrice,
      discountPct,
    };

    upsertPriceListItems.mutate(
      {
        priceListId: priceList.id,
        requests: [request],
      },
      {
        onSuccess: () => {
          closeForm();
        },
      },
    );
  };

  const handleDelete = (itemId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this price entry?",
    );

    if (!confirmed) {
      return;
    }

    deletePriceListItem.mutate({
      priceListId: priceList.id,
      itemId,
    });
  };

  const effectivePricePreview = useMemo(() => {
    const unitPrice = Number(form.unitPrice);
    const discount = Number(form.discountPct || 0);

    if (
      !Number.isFinite(unitPrice) ||
      unitPrice < 0 ||
      !Number.isFinite(discount) ||
      discount < 0 ||
      discount > 100
    ) {
      return null;
    }

    return unitPrice * (1 - discount / 100);
  }, [form.unitPrice, form.discountPct]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            {priceList.name} Items
          </h3>

          <p className="mt-1 text-sm text-text-secondary">
            Configure product and variant prices, quantity tiers, and discounts
            for this price list.
          </p>
        </div>

        {canCreate && (
          <Button
            type="button"
            leftIcon={<Plus className="size-4" />}
            onClick={openCreateForm}
          >
            Add Price
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-danger/30 bg-surface p-6">
          <p className="text-sm text-danger">
            Failed to load price-list items.
          </p>
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="No prices configured"
          description={`Add a price entry to configure pricing for ${priceList.name}.`}
          action={
            canCreate ? (
              <Button
                type="button"
                leftIcon={<Plus className="size-4" />}
                onClick={openCreateForm}
              >
                Add Price
              </Button>
            ) : undefined
          }
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>Min. Quantity</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Effective Price</TableHead>
              <TableHead className="w-28 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item) => {
              const discount = item.discountPct ?? 0;
              const effectivePrice = item.unitPrice * (1 - discount / 100);

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <span className="font-mono text-sm">{item.productId}</span>
                  </TableCell>

                  <TableCell>
                    {item.variantId ? (
                      <span className="font-mono text-sm">
                        {item.variantId}
                      </span>
                    ) : (
                      <Badge variant="secondary">All variants</Badge>
                    )}
                  </TableCell>

                  <TableCell>{item.minQuantity}</TableCell>

                  <TableCell>{item.unitPrice.toFixed(4)}</TableCell>

                  <TableCell>{discount.toFixed(2)}%</TableCell>

                  <TableCell className="font-medium">
                    {effectivePrice.toFixed(4)}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-1">
                      {canUpdate && (
                        <Button
                          type="button"
                          aria-label="Edit price entry"
                          onClick={() => openEditForm(item)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                      )}

                      {canDelete && (
                        <Button
                          type="button"
                          aria-label="Delete price entry"
                          disabled={deletePriceListItem.isPending}
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <Modal
        open={isFormOpen}
        title={editingItem ? "Edit Price" : "Add Price"}
        description={
          editingItem
            ? "Update the pricing rule for this price list."
            : "Configure a product or variant price for this price list."
        }
        size="lg"
        closeOnOverlayClick={!upsertPriceListItems.isPending}
        onClose={closeForm}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="product-search"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Product
              </label>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />

                <Input
                  id="product-search"
                  value={productSearch}
                  placeholder="Search products by name..."
                  className="pl-9"
                  onChange={(event) => {
                    setProductSearch(event.target.value);

                    if (event.target.value !== selectedProduct?.name) {
                      updateField("productId", "");
                      updateField("variantId", "");
                    }
                  }}
                />
              </div>
            </div>

            {!form.productId && productSearch.trim() && (
              <div className="max-h-52 overflow-y-auto rounded-lg border border-border">
                {isProductsLoading ? (
                  <div className="space-y-2 p-3">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                ) : products.length === 0 ? (
                  <p className="p-4 text-sm text-text-secondary">
                    No active products found.
                  </p>
                ) : (
                  <div className="divide-y divide-border">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-surface"
                        onClick={() => handleProductSelect(product)}
                      >
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {product.name}
                          </p>
                          <p className="mt-0.5 text-xs text-text-secondary">
                            {product.sku}
                            {product.barcode ? ` • ${product.barcode}` : ""}
                          </p>
                        </div>

                        <span className="text-xs text-text-secondary">
                          {product.categoryName}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedProduct && (
              <div className="rounded-lg border border-border bg-surface p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {selectedProduct.name}
                    </p>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      SKU: {selectedProduct.sku}
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => {
                      updateField("productId", "");
                      updateField("variantId", "");
                      setProductSearch("");
                    }}
                  >
                    Change
                  </Button>
                </div>
              </div>
            )}
          </div>

          {form.productId && (
            <div>
              <label
                htmlFor="variant"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Variant
              </label>

              {isVariantsLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : variants.length === 0 ? (
                <div className="rounded-lg border border-border bg-surface p-3 text-sm text-text-secondary">
                  This product has no variants. The price will apply at product
                  level.
                </div>
              ) : (
                <select
                  id="variant"
                  value={form.variantId}
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/30"
                  onChange={(event) =>
                    updateField("variantId", event.target.value)
                  }
                >
                  <option value="">All variants / product-level price</option>

                  {variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.sku}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {selectedVariant && (
            <div className="rounded-lg border border-border bg-surface p-3 text-sm">
              <p className="font-medium text-text-primary">Selected variant</p>
              <p className="mt-1 text-text-secondary">
                SKU: {selectedVariant.sku}
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="Minimum Quantity"
              type="number"
              min="0.001"
              step="0.001"
              value={form.minQuantity}
              onChange={(event) =>
                updateField("minQuantity", event.target.value)
              }
              required
            />

            <Input
              label={`Unit Price (${priceList.currencyCode})`}
              type="number"
              min="0"
              step="0.0001"
              value={form.unitPrice}
              onChange={(event) => updateField("unitPrice", event.target.value)}
              required
            />

            <Input
              label="Discount (%)"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={form.discountPct}
              onChange={(event) =>
                updateField("discountPct", event.target.value)
              }
            />
          </div>

          {effectivePricePreview !== null && (
            <div className="rounded-lg border border-border bg-surface p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                Effective Unit Price
              </p>

              <p className="mt-1 text-lg font-semibold text-text-primary">
                {effectivePricePreview.toFixed(4)} {priceList.currencyCode}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <Button
              type="button"
              disabled={upsertPriceListItems.isPending}
              onClick={closeForm}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={upsertPriceListItems.isPending || !form.productId}
            >
              {upsertPriceListItems.isPending
                ? "Saving..."
                : editingItem
                  ? "Update Price"
                  : "Add Price"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PriceListItemManager;
