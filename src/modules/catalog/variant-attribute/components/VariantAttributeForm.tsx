import { useState } from "react";

import Button from "@/components/ui/Button";
import FormSection from "@/components/form/FormSection";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import {
  useCreateVariantAttribute,
  useUpdateVariantAttribute,
} from "../hooks/useVariantAttributes";

import type {
  CreateVariantAttributeRequest,
  VariantAttribute,
} from "../types/variantAttribute";

interface VariantAttributeFormProps {
  attribute?: VariantAttribute | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormState {
  name: string;
  code: string;
  description: string;
}

const createInitialState = (
  attribute?: VariantAttribute | null,
): FormState => ({
  name: attribute?.name ?? "",
  code: attribute?.code ?? "",
  description: attribute?.description ?? "",
});

export function VariantAttributeForm({
  attribute,
  onSuccess,
  onCancel,
}: VariantAttributeFormProps) {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_CREATE);
  const canUpdate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_UPDATE);

  const isEditing = Boolean(attribute);
  const canSubmit = isEditing ? canUpdate : canCreate;

  const createMutation = useCreateVariantAttribute();
  const updateMutation = useUpdateVariantAttribute();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const [form, setForm] = useState<FormState>(() =>
    createInitialState(attribute),
  );

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

    const request: CreateVariantAttributeRequest = {
      name: form.name.trim(),
      code: form.code.trim(),
      description: form.description.trim() || undefined,
    };

    try {
      if (isEditing && attribute) {
        await updateMutation.mutateAsync({
          attributeId: attribute.id,
          request,
        });
      } else {
        await createMutation.mutateAsync(request);
      }

      onSuccess?.();
    } catch {
      // Global API error handling.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormSection
        title={
          isEditing ? "Edit Variant Attribute" : "Create Variant Attribute"
        }
        description={
          isEditing
            ? "Update the reusable attribute configuration."
            : "Create a reusable attribute that can be assigned to products and used to define variants."
        }
      >
        <div className="space-y-4">
          <Input
            id="variant-attribute-name"
            name="name"
            label="Name"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="e.g. Color"
            maxLength={50}
            required
            disabled={!canSubmit || isSubmitting}
          />

          <Input
            id="variant-attribute-code"
            name="code"
            label="Code"
            value={form.code}
            onChange={(event) => handleChange("code", event.target.value)}
            placeholder="e.g. COLOR"
            maxLength={30}
            pattern="[A-Za-z0-9_-]+"
            required
            disabled={!canSubmit || isSubmitting}
          />

          <Textarea
            id="variant-attribute-description"
            name="description"
            label="Description"
            value={form.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            placeholder="Describe what this attribute represents."
            maxLength={255}
            rows={4}
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
            {isEditing ? "Save Changes" : "Create Attribute"}
          </Button>
        </div>
      </FormSection>
    </form>
  );
}
