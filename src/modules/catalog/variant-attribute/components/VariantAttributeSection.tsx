import { useState } from "react";
import { Plus } from "lucide-react";

import { Button, Modal } from "@/components/ui";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import {
  useActivateVariantAttribute,
  useDeactivateVariantAttribute,
  useDeleteVariantAttribute,
  useVariantAttributes,
} from "../hooks/useVariantAttributes";

import type { VariantAttribute } from "../types/variantAttribute";

import { VariantAttributeForm } from "./VariantAttributeForm";
import VariantAttributeTable from "./VariantAttributeTable";
import VariantAttributeValueManager from "./VariantAttributeValueManager";

const VariantAttributeSection = () => {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_CREATE);

  const canRead = hasPermission(PERMISSIONS.PRODUCT_VARIANT_READ);

  const canUpdate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_UPDATE);

  const canDelete = hasPermission(PERMISSIONS.PRODUCT_VARIANT_DELETE);

  const {
    data: attributesResponse,
    isLoading,
    isError,
  } = useVariantAttributes();

  const attributes = attributesResponse?.data ?? [];

  const activateMutation = useActivateVariantAttribute();
  const deactivateMutation = useDeactivateVariantAttribute();
  const deleteMutation = useDeleteVariantAttribute();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] =
    useState<VariantAttribute | null>(null);

  const [valuesOpen, setValuesOpen] = useState(false);
  const [valuesAttribute, setValuesAttribute] =
    useState<VariantAttribute | null>(null);

  const handleCreate = () => {
    setSelectedAttribute(null);
    setFormOpen(true);
  };

  const handleEdit = (attribute: VariantAttribute) => {
    setSelectedAttribute(attribute);
    setFormOpen(true);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setSelectedAttribute(null);
  };

  const handleManageValues = (attribute: VariantAttribute) => {
    setValuesAttribute(attribute);
    setValuesOpen(true);
  };

  const handleActivate = async (attribute: VariantAttribute) => {
    if (!canUpdate) {
      return;
    }

    try {
      await activateMutation.mutateAsync(attribute.id);
    } catch {
      // Global API error handling is responsible for displaying the error.
    }
  };

  const handleDeactivate = async (attribute: VariantAttribute) => {
    if (!canUpdate) {
      return;
    }

    const confirmed = window.confirm(
      `Deactivate the "${attribute.name}" attribute?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deactivateMutation.mutateAsync(attribute.id);
    } catch {
      // Global API error handling is responsible for displaying the error.
    }
  };

  const handleDelete = async (attribute: VariantAttribute) => {
    if (!canDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Delete the "${attribute.name}" attribute? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(attribute.id);

      if (valuesAttribute?.id === attribute.id) {
        setValuesOpen(false);
        setValuesAttribute(null);
      }
    } catch {
      // Global API error handling is responsible for displaying the error.
    }
  };

  if (!canRead) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        {canCreate && (
          <Button
            type="button"
            leftIcon={<Plus className="size-4" />}
            onClick={handleCreate}
          >
            Add Attribute
          </Button>
        )}
      </div>

      {isError ? (
        <div className="rounded-lg border border-danger/30 bg-surface p-6">
          <p className="text-sm text-danger">
            Failed to load variant attributes.
          </p>
        </div>
      ) : (
        <VariantAttributeTable
          attributes={attributes}
          loading={isLoading}
          onEdit={handleEdit}
          onManageValues={handleManageValues}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
          onDelete={handleDelete}
        />
      )}

      <Modal
        open={formOpen}
        title={
          selectedAttribute
            ? "Edit Variant Attribute"
            : "Create Variant Attribute"
        }
        description={
          selectedAttribute
            ? "Update the reusable variant attribute definition."
            : "Create a reusable attribute that can be assigned to product variants."
        }
        size="md"
        onClose={() => {
          setFormOpen(false);
          setSelectedAttribute(null);
        }}
      >
        <VariantAttributeForm
          attribute={selectedAttribute}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setFormOpen(false);
            setSelectedAttribute(null);
          }}
        />
      </Modal>

      <Modal
        open={valuesOpen}
        title={
          valuesAttribute
            ? `Manage Values — ${valuesAttribute.name}`
            : "Manage Values"
        }
        description={
          valuesAttribute
            ? `Manage the available values for the ${valuesAttribute.name} attribute.`
            : undefined
        }
        size="lg"
        onClose={() => {
          setValuesOpen(false);
          setValuesAttribute(null);
        }}
      >
        {valuesAttribute && (
          <VariantAttributeValueManager
            attributeId={valuesAttribute.id}
            attributeName={valuesAttribute.name}
          />
        )}
      </Modal>
    </section>
  );
};

export default VariantAttributeSection;
