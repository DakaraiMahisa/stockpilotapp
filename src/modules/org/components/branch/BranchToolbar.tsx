import { Button, Input } from "@/components/ui/index";

import BranchStatusFilter from "./BranchStatusFilter";

import { BranchStatus } from "../../types/org.types";

interface BranchToolbarProps {
  search: string;
  status?: BranchStatus;

  onSearchChange: (value: string) => void;
  onStatusChange: (status?: BranchStatus) => void;
  onCreateBranch: () => void;
}

const BranchToolbar = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onCreateBranch,
}: BranchToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <Input
          placeholder="Search branches..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="md:w-80"
        />

        <BranchStatusFilter value={status} onChange={onStatusChange} />
      </div>

      <Button variant="primary" onClick={onCreateBranch}>
        New Branch
      </Button>
    </div>
  );
};

export default BranchToolbar;
