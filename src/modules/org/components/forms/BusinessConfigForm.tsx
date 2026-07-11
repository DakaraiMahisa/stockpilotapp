import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui";

import FormActions from "@/components/form/FormActions";
import FormSection from "@/components/form/FormSection";

import {
  businessConfigFormSchema,
  type BusinessConfigFormValues,
} from "./businessConfigFormSchema";

import {
  CURRENCY_POSITIONS,
  TIME_FORMATS,
  NUMBER_FORMATS,
  WEIGHT_UNITS,
  DIMENSION_UNITS,
} from "../../types/businessConfig";

interface BusinessConfigFormProps {
  initialValues?: Partial<BusinessConfigFormValues>;
  isSubmitting?: boolean;
  canEdit: boolean;
  onSubmit: (values: BusinessConfigFormValues) => void | Promise<void>;
}

const BusinessConfigForm = ({
  initialValues,
  isSubmitting = false,
  canEdit = false,
  onSubmit,
}: BusinessConfigFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessConfigFormValues>({
    resolver: zodResolver(businessConfigFormSchema),
    defaultValues: {
      timezone: "",
      currencyCode: "",
      currencySymbol: "",
      currencyPosition: "PREFIX",
      dateFormat: "dd/MM/yyyy",
      timeFormat: "H24",
      numberFormat: "DOT_COMMA",
      decimalPlaces: 2,
      fiscalYearStart: "01-01",
      defaultLanguage: "en",
      weightUnit: "KG",
      dimensionUnit: "CM",
      ...initialValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormSection
        title="Regional Settings"
        description="Configure language, timezone and date preferences."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            disabled={!canEdit}
            label="Timezone"
            {...register("timezone")}
            error={errors.timezone?.message}
          />

          <Input
            disabled={!canEdit}
            label="Default Language"
            {...register("defaultLanguage")}
            error={errors.defaultLanguage?.message}
          />

          <Input
            disabled={!canEdit}
            label="Date Format"
            {...register("dateFormat")}
            error={errors.dateFormat?.message}
          />

          <Input
            disabled={!canEdit}
            label="Fiscal Year Start"
            placeholder="MM-dd"
            {...register("fiscalYearStart")}
            error={errors.fiscalYearStart?.message}
          />
        </div>
      </FormSection>

      <FormSection
        title="Currency"
        description="Configure how monetary values are displayed."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            disabled={!canEdit}
            label="Currency Code"
            {...register("currencyCode")}
            error={errors.currencyCode?.message}
          />

          <Input
            disabled={!canEdit}
            label="Currency Symbol"
            {...register("currencySymbol")}
            error={errors.currencySymbol?.message}
          />

          <div>
            <label className="mb-1 block text-sm font-medium">
              Currency Position
            </label>

            <select
              disabled={!canEdit}
              {...register("currencyPosition")}
              className="w-full rounded-md border px-3 py-2"
            >
              {CURRENCY_POSITIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            {errors.currencyPosition && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currencyPosition.message}
              </p>
            )}
          </div>

          <Input
            disabled={!canEdit}
            type="number"
            label="Decimal Places"
            {...register("decimalPlaces", {
              valueAsNumber: true,
            })}
            error={errors.decimalPlaces?.message}
          />
        </div>
      </FormSection>

      <FormSection
        title="Formatting"
        description="Configure number and time formatting."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Time Format
            </label>

            <select
              disabled={!canEdit}
              {...register("timeFormat")}
              className="w-full rounded-md border px-3 py-2"
            >
              {TIME_FORMATS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            {errors.timeFormat && (
              <p className="mt-1 text-sm text-red-500">
                {errors.timeFormat.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Number Format
            </label>

            <select
              disabled={!canEdit}
              {...register("numberFormat")}
              className="w-full rounded-md border px-3 py-2"
            >
              {NUMBER_FORMATS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            {errors.numberFormat && (
              <p className="mt-1 text-sm text-red-500">
                {errors.numberFormat.message}
              </p>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Measurement Units"
        description="Configure default units used throughout the system."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Weight Unit
            </label>

            <select
              disabled={!canEdit}
              {...register("weightUnit")}
              className="w-full rounded-md border px-3 py-2"
            >
              {WEIGHT_UNITS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            {errors.weightUnit && (
              <p className="mt-1 text-sm text-red-500">
                {errors.weightUnit.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Dimension Unit
            </label>

            <select
              disabled={!canEdit}
              {...register("dimensionUnit")}
              className="w-full rounded-md border px-3 py-2"
            >
              {DIMENSION_UNITS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            {errors.dimensionUnit && (
              <p className="mt-1 text-sm text-red-500">
                {errors.dimensionUnit.message}
              </p>
            )}
          </div>
        </div>
      </FormSection>

      <FormActions
        saving={isSubmitting}
        submitLabel="Save Changes"
        disabled={!canEdit}
      />
    </form>
  );
};

export default BusinessConfigForm;
