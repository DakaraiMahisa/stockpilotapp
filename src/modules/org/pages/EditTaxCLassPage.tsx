import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { Card } from "@/components/ui";
import { notifier } from "@/lib/notifications/notifier";

import TaxClassForm from "../components/forms/TaxClassForm";

import { usePermissions } from "@/hooks/usePermissions";

import { PERMISSIONS } from "@/constants/permissions";

import { useTaxClass } from "../hooks/useTaxClass";
import { useUpdateTaxClass } from "../hooks/useUpdateTaxClass";

import type { TaxFormValues } from "../components/forms/taxFormSchema";

const EditTaxClassPage = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { hasPermission } = usePermissions();

  const canUpdate = hasPermission(PERMISSIONS.TAX_CONFIG_UPDATE);

  const { data, isLoading, isError } = useTaxClass(id!);

  const updateTaxClass = useUpdateTaxClass();

  if (isLoading) {
    return <p>Loading tax class...</p>;
  }

  if (isError || !data?.data) {
    return <p>Failed to load tax class.</p>;
  }

  const taxClass = data.data;

  const initialValues: Partial<TaxFormValues> = {
    name: taxClass.name,
    code: taxClass.code,
    taxType: taxClass.taxType,
    hsnSacCode: taxClass.hsnSacCode ?? "",
    description: taxClass.description ?? "",
  };

  const handleSubmit = async (values: TaxFormValues) => {
    try {
      await updateTaxClass.mutateAsync({
        id: taxClass.id,
        request: {
          name: values.name,
          hsnSacCode: values.hsnSacCode || null,
          description: values.description || null,
        },
      });

      notifier.success("Tax class updated successfully.");

      navigate("/organization/taxes");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ?? "Failed to update tax class.",
        );
      } else {
        notifier.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card className="p-6">
      <TaxClassForm
        mode="edit"
        initialValues={initialValues}
        canEdit={canUpdate}
        isSubmitting={updateTaxClass.isPending}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/organization/taxes")}
      />
    </Card>
  );
};

export default EditTaxClassPage;
