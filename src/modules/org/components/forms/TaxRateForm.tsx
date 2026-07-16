import { Button, Input } from "@/components/ui";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { TaxFormValues } from "./taxFormSchema";

import { RATE_TYPES } from "../../types/tax.types";

interface TaxRateFormProps {
  index: number;
  register: UseFormRegister<TaxFormValues>;
  errors: FieldErrors<TaxFormValues>;

  canRemove?: boolean;
  disabled?: boolean;
  onRemove?: () => void;
}

const TaxRateForm = ({
  index,
  register,
  errors,
  canRemove = false,
  disabled = false,
  onRemove,
}: TaxRateFormProps) => {
  const rateErrors = errors.rates?.[index];

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Rate Type</label>

          <select
            {...register(`rates.${index}.rateType`)}
            disabled={disabled}
            className="w-full rounded-md border px-3 py-2"
          >
            {RATE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {rateErrors?.rateType && (
            <p className="mt-1 text-sm text-red-500">
              {rateErrors.rateType.message}
            </p>
          )}
        </div>

        <Input
          label="Rate (%)"
          type="number"
          step="0.001"
          disabled={disabled}
          {...register(`rates.${index}.rate`, {
            valueAsNumber: true,
          })}
          error={rateErrors?.rate?.message}
        />

        <Input
          label="Effective From"
          type="date"
          disabled={disabled}
          {...register(`rates.${index}.effectiveFrom`)}
          error={rateErrors?.effectiveFrom?.message}
        />
      </div>

      {canRemove && (
        <Button type="button" variant="secondary" onClick={onRemove}>
          Remove Rate
        </Button>
      )}
    </div>
  );
};

export default TaxRateForm;
