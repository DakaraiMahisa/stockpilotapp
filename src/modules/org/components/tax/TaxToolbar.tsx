import { Button } from "@/components/ui";

import { usePermissions } from "@/hooks/usePermissions";

import { PERMISSIONS } from "@/constants/permissions";

interface TaxToolbarProps {
  onCreateTaxClass: () => void;
}

const TaxToolbar = ({ onCreateTaxClass }: TaxToolbarProps) => {
  const { hasPermission } = usePermissions();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">Tax Configuration</h1>
        <p className="text-sm text-muted-foreground">
          Configure tax classes and maintain historical tax rates.
        </p>
      </div>

      {hasPermission(PERMISSIONS.TAX_CONFIG_CREATE) && (
        <Button variant="primary" onClick={onCreateTaxClass}>
          New Tax Class
        </Button>
      )}
    </div>
  );
};

export default TaxToolbar;
