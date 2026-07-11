import axios from "axios";

import { notifier } from "@/lib/notifications/notifier";

import { Card } from "@/components/ui";

import BusinessConfigForm from "../components/forms/BusinessConfigForm";

import { usePermissions } from "@/hooks/usePermissions";

import { PERMISSIONS } from "@/constants/permissions";

import { useBusinessConfig } from "../hooks/useBusinessConfig";
import { useUpdateBusinessConfig } from "../hooks/useUpdateBusinessConfig";

import type { BusinessConfigFormValues } from "../components/forms/businessConfigFormSchema";

const BusinessConfigPage = () => {
  const { data, isLoading, isError } = useBusinessConfig();

  const updateBusinessConfig = useUpdateBusinessConfig();
  const { hasPermission } = usePermissions();

  const canUpdate = hasPermission(PERMISSIONS.BUSINESS_CONFIG_UPDATE);

  const businessConfig = data?.data;

  const handleSubmit = async (values: BusinessConfigFormValues) => {
    if (!canUpdate) {
      notifier.error(
        "You do not have permission to update business configuration.",
      );

      return;
    }
    try {
      await updateBusinessConfig.mutateAsync(values);

      notifier.success("Business configuration updated successfully.");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ??
            "Failed to update business configuration.",
        );
      } else {
        notifier.error("An unexpected error occurred.");
      }
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          Loading business configuration...
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <BusinessConfigForm
          initialValues={businessConfig}
          isSubmitting={updateBusinessConfig.isPending}
          canEdit={canUpdate}
          onSubmit={handleSubmit}
        />
      </Card>

      {isError && (
        <p className="text-center text-sm text-red-600">
          Failed to load business configuration.
        </p>
      )}
    </div>
  );
};

export default BusinessConfigPage;
