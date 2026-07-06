import { Badge } from "@/components/ui/badge";

import { BranchStatus } from "../../types/org.types";

interface BranchStatusBadgeProps {
  status: BranchStatus;
}

const STATUS_VARIANTS: Record<
  BranchStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [BranchStatus.DRAFT]: "outline",
  [BranchStatus.ACTIVE]: "default",
  [BranchStatus.INACTIVE]: "secondary",
  [BranchStatus.ARCHIVED]: "destructive",
};

const STATUS_LABELS: Record<BranchStatus, string> = {
  [BranchStatus.DRAFT]: "Draft",
  [BranchStatus.ACTIVE]: "Active",
  [BranchStatus.INACTIVE]: "Inactive",
  [BranchStatus.ARCHIVED]: "Archived",
};

const BranchStatusBadge = ({ status }: BranchStatusBadgeProps) => {
  return (
    <Badge variant={STATUS_VARIANTS[status]}>{STATUS_LABELS[status]}</Badge>
  );
};

export default BranchStatusBadge;
