import { BranchStatus } from "../../types/org.types";

interface BranchStatusFilterProps {
  value?: BranchStatus;
  onChange: (status?: BranchStatus) => void;
}

const BranchStatusFilter = ({ value, onChange }: BranchStatusFilterProps) => {
  return (
    <select
      value={value ?? ""}
      onChange={(e) =>
        onChange(e.target.value ? (e.target.value as BranchStatus) : undefined)
      }
      className="rounded-md border px-3 py-2 text-sm"
    >
      <option value="">All Statuses</option>

      <option value={BranchStatus.DRAFT}>Draft</option>

      <option value={BranchStatus.ACTIVE}>Active</option>

      <option value={BranchStatus.INACTIVE}>Inactive</option>

      <option value={BranchStatus.ARCHIVED}>Archived</option>
    </select>
  );
};

export default BranchStatusFilter;
