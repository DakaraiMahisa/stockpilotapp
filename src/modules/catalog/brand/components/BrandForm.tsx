import { type UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui";
import { FormActions, FormSection } from "@/components/form";

import type { BrandCreateFormValues } from "../schema/brand.schemas";

interface BrandFormProps {
  form: UseFormReturn<BrandCreateFormValues>;
  submitting?: boolean;
  editing?: boolean;
  onSubmit: (values: BrandCreateFormValues) => void;
  onCancel: () => void;
}

const FORM_ID = "brand-form";

const BrandForm = ({
  form,
  submitting = false,
  editing = false,
  onSubmit,
  onCancel,
}: BrandFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = form;

  return (
    <>
      <form
        id={FORM_ID}
        className="space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSection
          title="Brand Information"
          description="Define the basic details of the brand."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Brand Name"
              placeholder="e.g. Nike"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Brand Code"
              placeholder="e.g. NIKE"
              disabled={editing}
              error={errors.code?.message}
              {...register("code")}
            />

            <Input
              label="Logo Object Key"
              placeholder="Optional MinIO object key"
              error={errors.logoObjectKey?.message}
              {...register("logoObjectKey")}
            />

            <Input
              label="Website"
              placeholder="e.g. https://example.com"
              error={errors.website?.message}
              {...register("website")}
            />
          </div>
        </FormSection>
      </form>

      <FormActions
        formId={FORM_ID}
        saving={submitting}
        disabled={!isDirty}
        showCancel
        submitLabel={editing ? "Update Brand" : "Create Brand"}
        savingLabel={editing ? "Updating..." : "Creating..."}
        onCancel={onCancel}
      />
    </>
  );
};

export default BrandForm;
