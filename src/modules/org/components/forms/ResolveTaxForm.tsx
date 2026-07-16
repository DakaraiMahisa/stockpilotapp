import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui";

import FormActions from "@/components/form/FormActions";
import FormSection from "@/components/form/FormSection";

import {
  resolveTaxFormSchema,
  type ResolveTaxFormValues,
} from "./resolveTaxFormSchema";

import type { TaxClassDto } from "../../types/tax.types";

interface ResolveTaxFormProps {
  taxClasses: TaxClassDto[];
  initialValues?: Partial<ResolveTaxFormValues>;
  isSubmitting?: boolean;
  canResolve?: boolean;
  onSubmit: (values: ResolveTaxFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

const ResolveTaxForm = ({
  taxClasses,
  initialValues,
  isSubmitting = false,
  canResolve = true,
  onSubmit,
  onCancel,
}: ResolveTaxFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResolveTaxFormValues>({
    resolver: zodResolver(resolveTaxFormSchema),
    defaultValues: {
      taxClassId: "",
      amount: 0,
      transactionDate: new Date().toISOString().split("T")[0],
      ...initialValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormSection
        title="Resolve Tax"
        description="Calculate applicable taxes for a transaction."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Tax Class</label>

            <select
              {...register("taxClassId")}
              disabled={!canResolve}
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="">Select Tax Class</option>

              {taxClasses.map((taxClass) => (
                <option key={taxClass.id} value={taxClass.id}>
                  {taxClass.name} ({taxClass.code})
                </option>
              ))}
            </select>

            {errors.taxClassId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.taxClassId.message}
              </p>
            )}
          </div>

          <Input
            type="number"
            step="0.01"
            label="Taxable Amount"
            disabled={!canResolve}
            {...register("amount", {
              valueAsNumber: true,
            })}
            error={errors.amount?.message}
          />

          <Input
            type="date"
            label="Transaction Date"
            disabled={!canResolve}
            {...register("transactionDate")}
            error={errors.transactionDate?.message}
          />
        </div>
      </FormSection>

      <FormActions
        saving={isSubmitting}
        showCancel={!!onCancel}
        onCancel={onCancel}
        submitLabel="Resolve Tax"
        savingLabel="Resolving..."
      />
    </form>
  );
};

export default ResolveTaxForm;
