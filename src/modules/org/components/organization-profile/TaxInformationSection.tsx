import { useFormContext } from "react-hook-form";

import { Card, Input } from "@/components/ui";

import type { OrganizationFormData } from "../../schema/validation/organization.schema";

interface TaxInformationSectionProps {
  disabled?: boolean;
}

export default function TaxInformationSection({
  disabled = false,
}: TaxInformationSectionProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrganizationFormData>();

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Tax Information</h2>

        <p className="text-sm text-slate-500">
          Optional tax registration information used for invoicing and
          regulatory compliance.
        </p>
      </div>

      <Input
        label="GST / VAT Number"
        disabled={disabled}
        autoComplete="off"
        placeholder="Enter GST or VAT number"
        {...register("gstinVatNumber")}
        error={errors.gstinVatNumber?.message}
      />
    </Card>
  );
}
