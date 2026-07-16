import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Card } from "@/components/ui";
import { notifier } from "@/lib/notifications/notifier";

import { usePermissions } from "@/hooks/usePermissions";

import { PERMISSIONS } from "@/constants/permissions";
import TaxClassForm from "../components/forms/TaxClassForm";

import { useCreateTaxClass } from "../hooks/useCreateTaxClass";

import type { TaxFormValues } from "../components/forms/taxFormSchema";
import type { CreateTaxClassRequest } from "../types/tax.types";

const CreateTaxClassPage = () => {
  const navigate = useNavigate();

  const createTaxClass = useCreateTaxClass();

  const { hasPermission } = usePermissions();

  const canCreate = hasPermission(PERMISSIONS.TAX_CONFIG_CREATE);

  if (!canCreate) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          You do not have permission to create tax classes.
        </p>
      </Card>
    );
  }
  const handleSubmit = async (values: TaxFormValues) => {
    const request: CreateTaxClassRequest = {
      name: values.name,
      code: values.code,
      taxType: values.taxType,
      isDefault: false,
      hsnSacCode: values.hsnSacCode || null,
      description: values.description || null,
      rates: values.rates,
    };
    if (!canCreate) {
      notifier.error("You do not have permission to create tax classes.");
      return;
    }
    try {
      await createTaxClass.mutateAsync(request);

      notifier.success("Tax class created successfully.");

      navigate("/organization/taxes");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ?? "Failed to create tax class.",
        );
      } else {
        notifier.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card className="p-6">
      <TaxClassForm
        mode="create"
        isSubmitting={createTaxClass.isPending}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/organization/taxes")}
      />
    </Card>
  );
};

export default CreateTaxClassPage;
