import { Button } from "@/components/ui";

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
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" size="sm" onClick={() => onEdit?.(branch)}>
        Edit
      </Button>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onChangeStatus?.(branch)}
      >
        Status
      </Button>

      {!branch.defaultBranch && (
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
