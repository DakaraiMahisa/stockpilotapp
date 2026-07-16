import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Card } from "@/components/ui";
import { notifier } from "@/lib/notifications/notifier";

import {
  TaxEmptyState,
  TaxSkeleton,
  TaxTable,
  TaxToolbar,
  SetDefaultTaxClassDialog,
} from "../components/tax";

import { usePermissions } from "@/hooks/usePermissions";

import { PERMISSIONS } from "@/constants/permissions";

import { useTaxClasses } from "../hooks/useTaxClasses";
import { useSetDefaultTaxClass } from "../hooks/useSetDefaultTaxClass";

import type { TaxClassDto } from "../types/tax.types";

const TaxListPage = () => {
  const navigate = useNavigate();

  const [selectedTaxClass, setSelectedTaxClass] = useState<TaxClassDto | null>(
    null,
  );

  const [defaultDialogOpen, setDefaultDialogOpen] = useState(false);

  const { data, isLoading, isError } = useTaxClasses();

  const setDefaultTaxClass = useSetDefaultTaxClass();
  const { hasPermission } = usePermissions();

  const canRead = hasPermission(PERMISSIONS.TAX_CONFIG_READ);

  const taxClasses = data?.data ?? [];

  const handleCreateTaxClass = () => {
    navigate("/organization/tax/new");
  };

  const handleEditTaxClass = (taxClass: TaxClassDto) => {
    navigate(`/organization/tax/${taxClass.id}/edit`);
  };

  const handleAddRate = (taxClass: TaxClassDto) => {
    navigate(`/organization/tax/${taxClass.id}/rates/new`);
  };

  const handleSetDefault = (taxClass: TaxClassDto) => {
    setSelectedTaxClass(taxClass);
    setDefaultDialogOpen(true);
  };

  const handleCloseDefaultDialog = () => {
    setDefaultDialogOpen(false);
    setSelectedTaxClass(null);
  };

  const handleConfirmDefault = async () => {
    if (!selectedTaxClass) {
      return;
    }

    try {
      await setDefaultTaxClass.mutateAsync(selectedTaxClass.id);

      notifier.success(
        `"${selectedTaxClass.name}" is now the default tax class.`,
      );

      handleCloseDefaultDialog();
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ??
            "Failed to set the default tax class.",
        );
      } else {
        notifier.error(
          "An unexpected error occurred while setting the default tax class.",
        );
      }
    }
  };
  if (!canRead) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          You do not have permission to view tax configuration.
        </p>
      </Card>
    );
  }
  return (
    <div className="space-y-6">
      <TaxToolbar onCreateTaxClass={handleCreateTaxClass} />

      <Card>
        {isLoading ? (
          <TaxSkeleton />
        ) : taxClasses.length === 0 ? (
          <TaxEmptyState onCreateTaxClass={handleCreateTaxClass} />
        ) : (
          <TaxTable
            taxClasses={taxClasses}
            onEdit={handleEditTaxClass}
            onAddRate={handleAddRate}
            onSetDefault={handleSetDefault}
          />
        )}
      </Card>

      {isError && (
        <p className="text-center text-sm text-red-600">
          Failed to load tax classes.
        </p>
      )}

      <SetDefaultTaxClassDialog
        open={defaultDialogOpen}
        taxClass={selectedTaxClass}
        isSubmitting={setDefaultTaxClass.isPending}
        onClose={handleCloseDefaultDialog}
        onConfirm={handleConfirmDefault}
      />
    </div>
  );
};

export default TaxListPage;
