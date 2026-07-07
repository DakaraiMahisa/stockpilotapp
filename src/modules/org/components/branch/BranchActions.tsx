import { Button } from "@/components/ui";
import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";
import type { BranchDto } from "../../types/org.types";

interface BranchActionsProps {
  branch: BranchDto;
  onEdit?: (branch: BranchDto) => void;
  onChangeStatus?: (branch: BranchDto) => void;
  onSetDefault?: (branch: BranchDto) => void;
}

const BranchActions = ({
  branch,
  onEdit,
  onChangeStatus,
  onSetDefault,
}: BranchActionsProps) => {
  const { hasPermission } = usePermissions();
  return (
    <div className="flex items-center gap-2">
      {hasPermission(PERMISSIONS.BRANCHES_UPDATE) && (
        <Button variant="secondary" size="sm" onClick={() => onEdit?.(branch)}>
          Edit
        </Button>
      )}

      {hasPermission(PERMISSIONS.BRANCHES_UPDATE_STATUS) && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChangeStatus?.(branch)}
        >
          Update Status
        </Button>
      )}

      {hasPermission(PERMISSIONS.BRANCHES_SET_DEFAULT) &&
        !branch.defaultBranch && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSetDefault?.(branch)}
          >
            Set Default
          </Button>
        )}
    </div>
  );
};

export default BranchActions;
