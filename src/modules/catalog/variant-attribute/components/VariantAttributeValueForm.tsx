import { useState } from "react";

import Button from "@/components/ui/Button";
import FormSection from "@/components/form/FormSection";
import Input from "@/components/ui/Input";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import {
  useCreateVariantAttributeValue,
  useUpdateVariantAttributeValue,
} from "../hooks/useVariantAttributes";

import type {
  UpdateVariantAttributeValueRequest,
  VariantAttributeValue,
} from "../types/variantAttribute";

interface VariantAttributeValueFormProps {
  attributeId: string;
  value?: VariantAttributeValue | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormState {
  value: string;
  code: string;
  sortOrder: string;
}

const createInitialState = (
  value?: VariantAttributeValue | null,
): FormState => ({
  value: value?.value ?? "",
  code: value?.code ?? "",
  sortOrder: String(value?.sortOrder ?? 0),
});

export function VariantAttributeValueForm({
  attributeId,
  value,
  onSuccess,
  onCancel,
}: VariantAttributeValueFormProps) {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_CREATE);

  const canUpdate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_UPDATE);

  const isEditing = Boolean(value);
  const canSubmit = isEditing ? canUpdate : canCreate;

  const createMutation = useCreateVariantAttributeValue();
  const updateMutation = useUpdateVariantAttributeValue();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const [form, setForm] = useState<FormState>(() => createInitialState(value));

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit || isSubmitting) {
      return;
    }

    const sortOrder = Number(form.sortOrder);

    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      return;
    }

    try {
      if (isEditing && value) {
        const request: UpdateVariantAttributeValueRequest = {
          value: form.value.trim(),
          code: form.code.trim(),
          sortOrder,
        };

        await updateMutation.mutateAsync({
          attributeId,
          valueId: value.id,
          request,
        });
      } else {
        await createMutation.mutateAsync({
          attributeId,
          request: {
            value: form.value.trim(),
            code: form.code.trim(),
            sortOrder,
          },
        });
      }

      onSuccess?.();
    } catch {
      // Global API error handling.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormSection
        title={isEditing ? "Edit Attribute Value" : "Create Attribute Value"}
        description={
          isEditing
            ? "Update this reusable value."
            : "Add a value that can be selected when defining product variants."
        }
      >
        <div className="space-y-4">
          <Input
            id="variant-attribute-value"
            name="value"
            label="Value"
            value={form.value}
            onChange={(event) => handleChange("value", event.target.value)}
            placeholder="e.g. 256GB"
            maxLength={50}
            required
            disabled={!canSubmit || isSubmitting}
          />

          <Input
            id="variant-attribute-value-code"
            name="code"
            label="Code"
            value={form.code}
            onChange={(event) => handleChange("code", event.target.value)}
            placeholder="e.g. 256GB"
            maxLength={30}
            pattern="[A-Za-z0-9_-]+"
            required
            disabled={!canSubmit || isSubmitting}
          />

          <Input
            id="variant-attribute-value-sort-order"
            name="sortOrder"
            label="Sort Order"
            type="number"
            min={0}
            step={1}
            value={form.sortOrder}
            onChange={(event) => handleChange("sortOrder", event.target.value)}
            disabled={!canSubmit || isSubmitting}
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={!canSubmit}
          >
            {isEditing ? "Save Changes" : "Create Value"}
          </Button>
        </div>
      </FormSection>
    </form>
  );
}
