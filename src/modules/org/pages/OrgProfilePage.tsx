import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/components/ui";

import { useOrganization } from "../hooks/useOrganization";
import {
  organizationSchema,
  type OrganizationFormData,
} from "../schema/validation/organization.schema";

export default function OrgProfilePage() {
  const { data: organization, isLoading, isError, refetch } = useOrganization();

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    mode: "onBlur",
    defaultValues: {
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
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (!organization) return;

    reset({
      legalName: organization.legalName,
      displayName: organization.displayName,
      email: organization.email,
      phone: organization.phone ?? "",
      addressLine1: organization.addressLine1 ?? "",
      addressLine2: organization.addressLine2 ?? "",
      city: organization.city ?? "",
      stateProvince: organization.stateProvince ?? "",
      postalCode: organization.postalCode ?? "",
      countryCode: organization.countryCode,
      gstinVatNumber: organization.gstinVatNumber ?? "",
      website: organization.website ?? "",
    });
  }, [organization, reset]);

  if (isLoading) {
    return (
      <Card className="space-y-6 p-8">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-11 animate-pulse rounded bg-gray-200"
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

        <p className="text-gray-500">
          Please check your connection and try again.
        </p>

        <button
          onClick={() => refetch()}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </Card>
    );
  }

  return (
    <Card className="space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-bold">Organization Profile</h1>

        <p className="mt-1 text-gray-500">
          Manage your organization's business information.
        </p>
      </div>

      {/* Step 2: Form fields will go here */}

      <pre className="rounded-lg bg-gray-50 p-4 text-sm">
        {JSON.stringify(form.getValues(), null, 2)}
      </pre>
    </Card>
  );
}
