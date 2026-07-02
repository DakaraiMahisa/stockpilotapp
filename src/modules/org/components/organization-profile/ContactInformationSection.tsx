import { useFormContext } from "react-hook-form";

import { Card, Input } from "@/components/ui";

import type { OrganizationFormData } from "../../schema/validation/organization.schema";

export default function ContactInformationSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrganizationFormData>();

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Contact Information</h2>

        <p className="text-sm text-slate-500">
          Contact details used throughout the platform.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Phone"
          type="tel"
          autoComplete="tel"
          placeholder="+263771234567"
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>
    </Card>
  );
}
