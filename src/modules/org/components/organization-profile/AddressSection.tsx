import { useFormContext } from "react-hook-form";

import { Card, Input } from "@/components/ui";

import type { OrganizationFormData } from "../../schema/validation/organization.schema";

import CountrySelect from "@/components/form/CountrySelect";
interface AddressSectionProps {
  disabled?: boolean;
}
export default function AddressSection({
  disabled = false,
}: AddressSectionProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OrganizationFormData>();

  const countryCode = watch("countryCode");

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Address</h2>

        <p className="text-sm text-text-secondary">
          Business location and mailing address.
        </p>
      </div>

      <div className="grid gap-5">
        <CountrySelect
          label="Country"
          value={countryCode}
          isDisabled={disabled}
          onChange={(countryCode) => {
            if (disabled) return;

            setValue("countryCode", countryCode, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          error={errors.countryCode?.message}
        />

        <Input
          label="Address Line 1"
          autoComplete="address-line1"
          disabled={disabled}
          {...register("addressLine1")}
          error={errors.addressLine1?.message}
        />

        <Input
          label="Address Line 2"
          autoComplete="address-line2"
          disabled={disabled}
          {...register("addressLine2")}
          error={errors.addressLine2?.message}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="City"
            disabled={disabled}
            autoComplete="address-level2"
            {...register("city")}
            error={errors.city?.message}
          />

          <Input
            label="State / Province"
            disabled={disabled}
            autoComplete="address-level1"
            {...register("stateProvince")}
            error={errors.stateProvince?.message}
          />
        </div>

        <Input
          label="Postal Code"
          disabled={disabled}
          autoComplete="postal-code"
          {...register("postalCode")}
          error={errors.postalCode?.message}
        />
      </div>
    </Card>
  );
}
