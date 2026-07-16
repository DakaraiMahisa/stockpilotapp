import { useState } from "react";

import axios from "axios";

import { Card } from "@/components/ui";

import { notifier } from "@/lib/notifications/notifier";

import { usePermissions } from "@/hooks/usePermissions";

import { PERMISSIONS } from "@/constants/permissions";

import ResolveTaxForm from "../components/forms/ResolveTaxForm";
import TaxBreakdownCard from "../components/tax/TaxBreakdownCard";

import { useResolveTax } from "../hooks/useResolveTax";

import { useTaxClasses } from "../hooks/useTaxClasses";

import type { TaxBreakdownDto } from "../types/tax.types";
import type { ResolveTaxFormValues } from "../components/forms/resolveTaxFormSchema";

const ResolveTaxPage = () => {
  const { hasPermission } = usePermissions();

  const canResolve = hasPermission(PERMISSIONS.TAX_CONFIG_RESOLVE);

  const resolveTax = useResolveTax();

  const { data: taxClassesResponse } = useTaxClasses();

  const taxClasses = taxClassesResponse?.data ?? [];

  const [breakdown, setBreakdown] = useState<TaxBreakdownDto | null>(null);

  const handleSubmit = async (values: ResolveTaxFormValues) => {
    if (!canResolve) {
      notifier.error("You do not have permission to resolve taxes.");
      return;
    }
    setBreakdown(null);
    try {
      const response = await resolveTax.mutateAsync(values);

      setBreakdown(response.data);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ?? "Failed to calculate tax.",
        );
      } else {
        notifier.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resolve Tax</h1>

        <p className="text-sm text-muted-foreground">
          Calculate the applicable tax breakdown for a transaction.
        </p>
      </div>

      <Card className="p-6">
        <ResolveTaxForm
          taxClasses={taxClasses}
          onSubmit={handleSubmit}
          isSubmitting={resolveTax.isPending}
          canResolve={canResolve}
        />
      </Card>

      {resolveTax.isPending && (
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Calculating tax...</p>
        </Card>
      )}

      {breakdown && <TaxBreakdownCard breakdown={breakdown} />}
    </div>
  );
};

export default ResolveTaxPage;
