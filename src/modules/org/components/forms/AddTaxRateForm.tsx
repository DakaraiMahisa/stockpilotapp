import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui";

import FormActions from "@/components/form/FormActions";
import FormSection from "@/components/form/FormSection";

import { taxRateFormSchema, type TaxRateFormValues } from "./taxRateFormSchema";

import { RATE_TYPES } from "../../types/tax.types";

interface AddTaxRateFormProps {
  isSubmitting?: boolean;
  canEdit?: boolean;
  onSubmit: (values: TaxRateFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

const AddTaxRateForm = ({
  isSubmitting = false,
  canEdit = true,
  onSubmit,
  onCancel,
}: AddTaxRateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaxRateFormValues>({
    resolver: zodResolver(taxRateFormSchema),
    defaultValues: {
      rateType: "CGST",
      rate: 0,
      effectiveFrom: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormSection
        title="Tax Rate"
        description="Add a new effective tax rate for this tax class."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Rate Type</label>

            <select
              {...register("rateType")}
              disabled={!canEdit}
              className="w-full rounded-md border px-3 py-2"
            >
              {RATE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {errors.rateType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.rateType.message}
              </p>
            )}
          </div>

          <Input
            label="Rate (%)"
            type="number"
            step="0.001"
            disabled={!canEdit}
            {...register("rate", {
              valueAsNumber: true,
            })}
            error={errors.rate?.message}
          />

          <Input
            label="Effective From"
            type="date"
            disabled={!canEdit}
            {...register("effectiveFrom")}
            error={errors.effectiveFrom?.message}
          />
        </div>
      </FormSection>

      <FormActions
        saving={isSubmitting}
        showCancel={!!onCancel}
        onCancel={onCancel}
        submitLabel="Add Tax Rate"
        savingLabel="Adding..."
      />
    </form>
  );
};

export default AddTaxRateForm;
