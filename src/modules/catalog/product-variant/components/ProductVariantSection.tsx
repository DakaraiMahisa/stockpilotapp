import { useState } from "react";
import { Modal, Button } from "@/components/ui";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import {
  useCreateProductVariants,
  useDeleteProductVariant,
  useDeactivateProductVariant,
  useProductVariantAttributes,
  useProductVariants,
  useUpdateProductVariant,
} from "../hooks/useProductVariant";
import type {
  ProductVariant,
  ProductVariantCreateRequest,
  ProductVariantUpdateRequest,
} from "../types/productVariant.types";
import ProductVariantForm from "./ProductVariantForm";
import ProductVariantTable from "./ProductVariantTable";
import ProductVariantAttributeManager from "./ProductVariantAttributeManager";

interface ProductVariantSectionProps {
  productId: string;
}

const ProductVariantSection = ({ productId }: ProductVariantSectionProps) => {
  const { hasPermission } = usePermissions();

  const canRead = hasPermission(PERMISSIONS.PRODUCT_VARIANT_READ);
  const canCreate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_CREATE);
  const canUpdate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_UPDATE);
  const canDelete = hasPermission(PERMISSIONS.PRODUCT_VARIANT_DELETE);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAttributeManagerOpen, setIsAttributeManagerOpen] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  const [variantToDeactivate, setVariantToDeactivate] =
    useState<ProductVariant | null>(null);

  const [variantToDelete, setVariantToDelete] = useState<ProductVariant | null>(
    null,
  );

  const variantsQuery = useProductVariants(productId);
  const attributesQuery = useProductVariantAttributes(productId);

  const createMutation = useCreateProductVariants();
  const updateMutation = useUpdateProductVariant();
  const deactivateMutation = useDeactivateProductVariant();
  const deleteMutation = useDeleteProductVariant();

  if (!canRead) {
    return null;
  }

  const variants = variantsQuery.data?.data ?? [];
  const attributes = attributesQuery.data?.data ?? [];

  const handleOpenCreate = () => {
    setSelectedVariant(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    if (createMutation.isPending || updateMutation.isPending) {
      return;
    }

    setIsFormOpen(false);
    setSelectedVariant(null);
  };

  const handleSubmit = (
    data: ProductVariantCreateRequest | ProductVariantUpdateRequest,
  ) => {
    if (selectedVariant) {
      updateMutation.mutate({
        productId,
        variantId: selectedVariant.id,
        request: data as ProductVariantUpdateRequest,
      });

      return;
    }

    createMutation.mutate(
      {
        productId,
        requests: [data as ProductVariantCreateRequest],
      },
      {
        onSuccess: () => {
          setIsFormOpen(false);
          setSelectedVariant(null);
        },
      },
    );
  };

  const handleDeactivate = () => {
    if (!variantToDeactivate) {
      return;
    }

    deactivateMutation.mutate(
      {
        productId,
        variantId: variantToDeactivate.id,
      },
      {
        onSuccess: () => {
          setVariantToDeactivate(null);
        },
      },
    );
  };

  const handleDelete = () => {
    if (!variantToDelete) {
      return;
    }

    deleteMutation.mutate(
      {
        productId,
        variantId: variantToDelete.id,
      },
      {
        onSuccess: () => {
          setVariantToDelete(null);
        },
      },
    );
  };

  const formSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Product Variants
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Manage product variations, pricing, and attributes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {canUpdate && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAttributeManagerOpen(true)}
            >
              Configure Attributes
            </Button>
          )}

          {canCreate && (
            <Button type="button" onClick={handleOpenCreate}>
              Add Variant
            </Button>
          )}
        </div>
      </div>

      {variantsQuery.isError ? (
        <div className="rounded-lg border border-danger bg-surface p-4">
          <p className="text-sm text-danger">
            Failed to load product variants.
          </p>
        </div>
      ) : (
        <ProductVariantTable
          variants={variants}
          loading={variantsQuery.isLoading}
          canUpdate={canUpdate}
          canDelete={canDelete}
          onEdit={handleOpenEdit}
          onDeactivate={setVariantToDeactivate}
          onDelete={setVariantToDelete}
        />
      )}

      {/* Variant attribute configuration */}
      <Modal
        open={isAttributeManagerOpen}
        title="Product Variant Attributes"
        description="Choose which attributes are available when defining variants for this product."
        size="lg"
        onClose={() => setIsAttributeManagerOpen(false)}
      >
        {isAttributeManagerOpen && (
          <ProductVariantAttributeManager productId={productId} />
        )}
      </Modal>

      {/* Create / Edit Variant */}
      <Modal
        open={isFormOpen}
        title={
          selectedVariant ? "Edit Product Variant" : "Create Product Variant"
        }
        description={
          selectedVariant
            ? "Update the variant details and pricing."
            : "Create a new variant for this product."
        }
        size="lg"
        closeOnOverlayClick={!formSubmitting}
        onClose={handleCloseForm}
      >
        {isFormOpen && (
          <ProductVariantForm
            key={selectedVariant?.id ?? "create"}
            attributes={attributes}
            variant={selectedVariant}
            loading={attributesQuery.isLoading}
            submitting={formSubmitting}
            onSubmit={handleSubmit}
            onCancel={handleCloseForm}
          />
        )}
      </Modal>

      {/* Deactivate Variant */}
      <Modal
        open={Boolean(variantToDeactivate)}
        title="Deactivate Variant"
        description="This variant will no longer be active for use."
        size="sm"
        closeOnOverlayClick={!deactivateMutation.isPending}
        onClose={() => {
          if (!deactivateMutation.isPending) {
            setVariantToDeactivate(null);
          }
        }}
      >
        <div className="space-y-6">
          <p className="text-sm text-text-secondary">
            Are you sure you want to deactivate{" "}
            <span className="font-medium text-text-primary">
              {variantToDeactivate?.sku}
            </span>
            ?
          </p>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={deactivateMutation.isPending}
              onClick={() => setVariantToDeactivate(null)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="danger"
              loading={deactivateMutation.isPending}
              onClick={handleDeactivate}
            >
              Deactivate
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Variant */}
      <Modal
        open={Boolean(variantToDelete)}
        title="Delete Variant"
        description="This action cannot be undone."
        size="sm"
        closeOnOverlayClick={!deleteMutation.isPending}
        onClose={() => {
          if (!deleteMutation.isPending) {
            setVariantToDelete(null);
          }
        }}
      >
        <div className="space-y-6">
          <p className="text-sm text-text-secondary">
            Are you sure you want to permanently delete{" "}
            <span className="font-medium text-text-primary">
              {variantToDelete?.sku}
            </span>
            ?
          </p>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={deleteMutation.isPending}
              onClick={() => setVariantToDelete(null)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="danger"
              loading={deleteMutation.isPending}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ProductVariantSection;
