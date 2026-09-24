import { useState } from "react";
import { Pencil, Power, Plus, Trash2 } from "lucide-react";

import EmptyState from "@/components/feedback/EmptyState";
import Skeleton from "@/components/feedback/Skeleton";

import {
  Badge,
  Button,
  Modal,
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
  useActivateVariantAttributeValue,
  useDeactivateVariantAttributeValue,
  useDeleteVariantAttributeValue,
  useVariantAttributeValues,
} from "../hooks/useVariantAttributes";

import { VariantAttributeValueForm } from "./VariantAttributeValueForm";

import type { VariantAttributeValue } from "../types/variantAttribute";

interface VariantAttributeValueManagerProps {
  attributeId: string;
  attributeName: string;
}

const VariantAttributeValueManager = ({
  attributeId,
  attributeName,
}: VariantAttributeValueManagerProps) => {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_CREATE);

  const canUpdate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_UPDATE);

  const canDelete = hasPermission(PERMISSIONS.PRODUCT_VARIANT_DELETE);

  const {
    data: valuesResponse,
    isLoading,
    isError,
  } = useVariantAttributeValues(attributeId);

  const values = valuesResponse?.data ?? [];

  const activateMutation = useActivateVariantAttributeValue();
  const deactivateMutation = useDeactivateVariantAttributeValue();
  const deleteMutation = useDeleteVariantAttributeValue();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedValue, setSelectedValue] =
    useState<VariantAttributeValue | null>(null);

  const handleCreate = () => {
    setSelectedValue(null);
    setFormOpen(true);
  };

  const handleEdit = (value: VariantAttributeValue) => {
    setSelectedValue(value);
    setFormOpen(true);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setSelectedValue(null);
  };

  const handleActivate = async (value: VariantAttributeValue) => {
    if (!canUpdate) {
      return;
    }

    try {
      await activateMutation.mutateAsync({
        attributeId,
        valueId: value.id,
      });
    } catch {
      // Global API error handling handles the error.
    }
  };

  const handleDeactivate = async (value: VariantAttributeValue) => {
    if (!canUpdate) {
      return;
    }

    const confirmed = window.confirm(`Deactivate the "${value.value}" value?`);

    if (!confirmed) {
      return;
    }

    try {
      await deactivateMutation.mutateAsync({
        attributeId,
        valueId: value.id,
      });
    } catch {
      // Global API error handling handles the error.
    }
  };

  const handleDelete = async (value: VariantAttributeValue) => {
    if (!canDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Delete the "${value.value}" value? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({
        attributeId,
        valueId: value.id,
      });
    } catch {
      // Global API error handling handles the error.
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            {attributeName} Values
          </h3>

          <p className="mt-1 text-sm text-text-secondary">
            Configure the values available for this variant attribute.
          </p>
        </div>

        {canCreate && (
          <Button
            type="button"
            leftIcon={<Plus className="size-4" />}
            onClick={handleCreate}
          >
            Add Value
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
            Failed to load attribute values.
          </p>
        </div>
      ) : values.length === 0 ? (
        <EmptyState
          title="No values configured"
          description={`Add a value to make ${attributeName} available when creating product variants.`}
          action={
            canCreate ? (
              <Button
                type="button"
                leftIcon={<Plus className="size-4" />}
                onClick={handleCreate}
              >
                Add Value
              </Button>
            ) : undefined
          }
        />
      ) : (
        <Table>{/* existing table */}</Table>
      )}
      <div className="flex min-h-40 items-center justify-center rounded-lg border border-border bg-surface">
        <div className="text-center">
          <p className="text-sm font-medium text-text-primary">
            No values configured
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Add a value to make this attribute available when creating product
            variants.
          </p>

          {canCreate && (
            <Button
              type="button"
              size="sm"
              className="mt-4"
              leftIcon={<Plus className="size-4" />}
              onClick={handleCreate}
            >
              Add Value
            </Button>
          )}
        </div>
      </div>
      ) : (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Value</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Sort Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-40 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {values.map((value) => (
            <TableRow key={value.id}>
              <TableCell className="font-medium">{value.value}</TableCell>

              <TableCell>
                <span className="font-mono text-sm">{value.code}</span>
              </TableCell>

              <TableCell>{value.sortOrder}</TableCell>

              <TableCell>
                <Badge variant={value.active ? "default" : "secondary"}>
                  {value.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-1">
                  {canUpdate && (
                    <>
                      <Button
                        type="button"
                        aria-label={`Edit ${value.value}`}
                        onClick={() => handleEdit(value)}
                      >
                        <Pencil className="size-4" />
                      </Button>

                      <Button
                        type="button"
                        aria-label={
                          value.active
                            ? `Deactivate ${value.value}`
                            : `Activate ${value.value}`
                        }
                        onClick={() =>
                          value.active
                            ? handleDeactivate(value)
                            : handleActivate(value)
                        }
                      >
                        <Power className="size-4" />
                      </Button>
                    </>
                  )}

                  {canDelete && (
                    <Button
                      type="button"
                      variant="danger"
                      aria-label={`Delete ${value.value}`}
                      onClick={() => handleDelete(value)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )
      <Modal
        open={formOpen}
        title={
          selectedValue
            ? "Edit Variant Attribute Value"
            : "Create Variant Attribute Value"
        }
        description={
          selectedValue
            ? `Update the value for ${attributeName}.`
            : `Add a value to the ${attributeName} attribute.`
        }
        size="md"
        onClose={() => {
          setFormOpen(false);
          setSelectedValue(null);
        }}
      >
        <VariantAttributeValueForm
          attributeId={attributeId}
          value={selectedValue}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setFormOpen(false);
            setSelectedValue(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default VariantAttributeValueManager;
