import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Button, Input } from "@/components/ui";

import FormActions from "@/components/form/FormActions";
import FormSection from "@/components/form/FormSection";

import { taxFormSchema, type TaxFormValues } from "./taxFormSchema";

import TaxRateForm from "./TaxRateForm";

import { TAX_TYPES } from "../../types/tax.types";

interface TaxClassFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<TaxFormValues>;
  isSubmitting?: boolean;
  canEdit?: boolean;
  onSubmit: (values: TaxFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

const TaxClassForm = ({
  mode,
  initialValues,
  isSubmitting = false,
  canEdit = true,
  onSubmit,
  onCancel,
}: TaxClassFormProps) => {
  const readOnly = mode === "edit";

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaxFormValues>({
    resolver: zodResolver(taxFormSchema),

    defaultValues: {
      name: "",
      code: "",
      taxType: "GST",
      hsnSacCode: "",
      description: "",
      rates: [
        {
          rateType: "CGST",
          rate: 0,
          effectiveFrom: "",
        },
      ],
      ...initialValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rates",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormSection
        title="Tax Class Information"
        description="Basic information about this tax class."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Tax Class Name"
            disabled={!canEdit}
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Tax Code"
            disabled={readOnly}
            {...register("code")}
            error={errors.code?.message}
          />

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Tax Type</label>

            <select
              {...register("taxType")}
              disabled={readOnly}
              className="w-full rounded-md border px-3 py-2"
            >
              {TAX_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {errors.taxType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.taxType.message}
              </p>
            )}
          </div>

          <Input
            label="HSN / SAC Code"
            disabled={!canEdit}
            {...register("hsnSacCode")}
            error={errors.hsnSacCode?.message}
          />

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              disabled={!canEdit}
              {...register("description")}
              className="w-full rounded-md border px-3 py-2"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </FormSection>

      {mode === "create" && (
        <FormSection
          title="Initial Tax Rates"
          description="Configure the initial tax rates for this tax class."
        >
          <div className="space-y-6">
            {fields.map((field, index) => (
              <TaxRateForm
                key={field.id}
                index={index}
                register={register}
                errors={errors}
                disabled={!canEdit}
                canRemove={fields.length > 1}
                onRemove={() => remove(index)}
              />
            ))}

            {canEdit && (
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
                    rateType: "CGST",
                    rate: 0,
                    effectiveFrom: "",
                  })
                }
              >
                Add Tax Rate
              </Button>
            )}
          </div>
        </FormSection>
      )}

      {canEdit ? (
        <FormActions
          saving={isSubmitting}
          showCancel={!!onCancel}
          onCancel={onCancel}
          submitLabel={mode === "create" ? "Create Tax Class" : "Save Changes"}
        />
      ) : (
        <FormActions showCancel={!!onCancel} onCancel={onCancel} />
      )}
    </form>
  );
};

export default TaxClassForm;
