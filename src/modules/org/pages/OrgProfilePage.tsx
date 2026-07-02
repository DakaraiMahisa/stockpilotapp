import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Card } from "@/components/ui";
import { notifier } from "@/lib/notifications/notifier";

import CompanyInformationSection from "../components/organization-profile/CompanyInformationSection";
import ContactInformationSection from "../components/organization-profile/ContactInformationSection";
import AddressSection from "../components/organization-profile/AddressSection";
import TaxInformationSection from "../components/organization-profile/TaxInformationSection";

import {
  useOrganization,
  useOrganizationLogo,
  useUpdateOrganization,
} from "../hooks/useOrganization";
import { useLogoUpload } from "../hooks/useLogoUpload";

import {
  organizationSchema,
  type OrganizationFormData,
} from "../schema/validation/organization.schema";

import { type Organization } from "../types/org.types";

const EMPTY_FORM: OrganizationFormData = {
  legalName: "",
  displayName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  countryCode: "",
  gstinVatNumber: "",
  website: "",
};

const toFormValues = (organization: Organization): OrganizationFormData => ({
  legalName: organization.legalName ?? "",
  displayName: organization.displayName ?? "",
  email: organization.email ?? "",
  phone: organization.phone ?? "",
  addressLine1: organization.addressLine1 ?? "",
  addressLine2: organization.addressLine2 ?? "",
  city: organization.city ?? "",
  stateProvince: organization.stateProvince ?? "",
  postalCode: organization.postalCode ?? "",
  countryCode: organization.countryCode ?? "",
  gstinVatNumber: organization.gstinVatNumber ?? "",
  website: organization.website ?? "",
});

export default function OrgProfilePage() {
  const { data: organization, isLoading, isError, refetch } = useOrganization();

  const { data: logoBlob, isLoading: isLogoLoading } = useOrganizationLogo();

  const updateOrganization = useUpdateOrganization();

  const { uploadLogo, isUploading } = useLogoUpload();

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    mode: "onBlur",
    defaultValues: EMPTY_FORM,
  });

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = form;

  useEffect(() => {
    if (!organization) return;

    reset(toFormValues(organization));
  }, [organization, reset]);

  const logoUrl = useMemo(() => {
    if (!logoBlob) {
      return undefined;
    }

    return URL.createObjectURL(logoBlob);
  }, [logoBlob]);

  useEffect(() => {
    return () => {
      if (logoUrl) {
        URL.revokeObjectURL(logoUrl);
      }
    };
  }, [logoUrl]);

  const onSubmit = async (data: OrganizationFormData) => {
    try {
      await updateOrganization.mutateAsync(data);

      notifier.success("Organization profile updated successfully.");

      reset(data);
    } catch (error) {
      notifier.error(
        error instanceof Error
          ? error.message
          : "Failed to update organization profile.",
      );
    }
  };

  const handleReset = () => {
    if (!organization) return;

    reset(toFormValues(organization));
  };

  if (isLoading || (organization && isLogoLoading)) {
    return (
      <Card className="space-y-6 p-8">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />

        <div className="grid gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="space-y-6 p-8 text-center">
        <h2 className="text-xl font-semibold">
          Unable to load organization profile
        </h2>

        <p className="text-slate-500">
          Please check your connection and try again.
        </p>

        <Button onClick={() => refetch()}>Retry</Button>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          Organization Profile
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your organization's branding, contact details and business
          information.
        </p>
      </header>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CompanyInformationSection
            logoUrl={logoUrl}
            loading={isLogoLoading}
            uploading={isUploading}
            onLogoSelected={uploadLogo}
          />

          <ContactInformationSection />

          <AddressSection />

          <TaxInformationSection />

          <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white py-6">
            <Button
              type="button"
              variant="secondary"
              disabled={!isDirty || isUploading || updateOrganization.isPending}
              onClick={handleReset}
            >
              Reset
            </Button>

            <Button
              type="submit"
              loading={updateOrganization.isPending}
              disabled={!isDirty || isUploading || updateOrganization.isPending}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
