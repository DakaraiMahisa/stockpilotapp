import { useFormContext } from "react-hook-form";

import { Card, Input } from "@/components/ui";

import type { OrganizationFormData } from "../../schema/validation/organization.schema";

import LogoUploader from "../LogoUploader";

interface CompanyInformationSectionProps {
  logoUrl?: string;
  uploading?: boolean;
  loading?: boolean;
  onLogoSelected: (file: File) => void;
}

export default function CompanyInformationSection({
  logoUrl,
  uploading = false,
  loading = false,
  onLogoSelected,
}: CompanyInformationSectionProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrganizationFormData>();

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Company Information</h2>

        <p className="text-sm text-slate-500">
          Update your organization's public business information.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <LogoUploader
          logoUrl={logoUrl}
          loading={loading}
          uploading={uploading}
          onFileSelected={onLogoSelected}
        />

        <div className="grid gap-5">
          <Input
            label="Legal Name"
            {...register("legalName")}
            error={errors.legalName?.message}
          />

          <Input
            label="Display Name"
            {...register("displayName")}
            error={errors.displayName?.message}
          />

          <Input
            label="Website"
            type="url"
            placeholder="https://example.com"
            {...register("website")}
            error={errors.website?.message}
          />
        </div>
      </div>
    </Card>
  );
}
