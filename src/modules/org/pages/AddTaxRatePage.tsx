import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { Card } from "@/components/ui";
import { notifier } from "@/lib/notifications/notifier";

import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";

import AddTaxRateForm from "../components/forms/AddTaxRateForm";
import { useTaxClass } from "../hooks/useTaxClass";
import { useAddTaxRate } from "../hooks/useAddTaxRate";

import type { TaxRateFormValues } from "../components/forms/taxRateFormSchema";

const AddTaxRatePage = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { hasPermission } = usePermissions();

  const canCreate = hasPermission(PERMISSIONS.TAX_CONFIG_UPDATE);

  const { data, isLoading, isError } = useTaxClass(id!);

  const addTaxRate = useAddTaxRate();

  if (isLoading) {
    return <p>Loading tax class...</p>;
  }

  if (isError || !data?.data) {
    return <p>Failed to load tax class.</p>;
  }

  const taxClass = data.data;

  const handleSubmit = async (values: TaxRateFormValues) => {
    if (!canCreate) {
      notifier.error("You do not have permission to add tax rates.");
      return;
    }

    try {
      await addTaxRate.mutateAsync({
        taxClassId: taxClass.id,
        request: values,
      });

      notifier.success("Tax rate added successfully.");

      navigate(`/organization/tax/${taxClass.id}/edit`);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ?? "Failed to add tax rate.",
        );
      } else {
        notifier.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{taxClass.name}</h2>

          <p className="text-sm text-muted-foreground">Code: {taxClass.code}</p>

          <p className="text-sm text-muted-foreground">
            Type: {taxClass.taxType}
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <AddTaxRateForm
          isSubmitting={addTaxRate.isPending}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          canEdit={canCreate}
        />
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Existing Tax Rates</h3>

        {taxClass.rates.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tax rates have been configured yet.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Rate Type</th>
                <th className="py-2 text-left">Rate (%)</th>
                <th className="py-2 text-left">Effective From</th>
                <th className="py-2 text-left">Effective To</th>
              </tr>
            </thead>

            <tbody>
              {taxClass.rates.map((rate) => (
                <tr key={rate.id} className="border-b">
                  <td className="py-2">{rate.rateType}</td>
                  <td className="py-2">{rate.rate}%</td>
                  <td className="py-2">{rate.effectiveFrom}</td>
                  <td className="py-2">{rate.effectiveTo ?? "Active"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default AddTaxRatePage;
