import { Button } from "@/components/ui";

import { usePermissions } from "@/hooks/usePermissions";

import { PERMISSIONS } from "@/constants/permissions";

import type { TaxClassDto } from "../../types/tax.types";

interface TaxActionsProps {
  taxClass: TaxClassDto;
  onEdit?: (taxClass: TaxClassDto) => void;
  onAddRate?: (taxClass: TaxClassDto) => void;
  onSetDefault?: (taxClass: TaxClassDto) => void;
}

const TaxActions = ({
  taxClass,
  onEdit,
  onAddRate,
  onSetDefault,
}: TaxActionsProps) => {
  const { hasPermission } = usePermissions();

  return (
    <div className="flex items-center gap-2">
      {hasPermission(PERMISSIONS.TAX_CONFIG_UPDATE) && (
        <>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit?.(taxClass)}
          >
            Edit
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddRate?.(taxClass)}
          >
            Add New Rate
          </Button>
        </>
      )}

      {hasPermission(PERMISSIONS.TAX_CONFIG_SET_DEFAULT) &&
        !taxClass.defaultTaxClass && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSetDefault?.(taxClass)}
          >
            Set Default
          </Button>
        )}
    </div>
  );
};

export default TaxActions;
