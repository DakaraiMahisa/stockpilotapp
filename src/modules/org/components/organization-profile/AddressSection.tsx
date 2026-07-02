import { useFormContext } from "react-hook-form";

import { Card, Input } from "@/components/ui";

import type { OrganizationFormData } from "../../schema/validation/organization.schema";

import CountrySelect from "@/components/form/CountrySelect";

export default function AddressSection() {
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

        <p className="text-sm text-slate-500">
          Business location and mailing address.
        </p>
      </div>

      <div className="grid gap-5">
        <CountrySelect
          label="Country"
          value={countryCode}
          onChange={(countryCode) =>
            setValue("countryCode", countryCode, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          error={errors.countryCode?.message}
        />

        <Input
          label="Address Line 1"
          autoComplete="address-line1"
          {...register("addressLine1")}
          error={errors.addressLine1?.message}
        />

        <Input
          label="Address Line 2"
          autoComplete="address-line2"
          {...register("addressLine2")}
          error={errors.addressLine2?.message}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="City"
            autoComplete="address-level2"
            {...register("city")}
            error={errors.city?.message}
          />

          <Input
            label="State / Province"
            autoComplete="address-level1"
            {...register("stateProvince")}
            error={errors.stateProvince?.message}
          />
        </div>

        <Input
          label="Postal Code"
          autoComplete="postal-code"
          {...register("postalCode")}
          error={errors.postalCode?.message}
        />
      </div>
    </Card>
  );
}
