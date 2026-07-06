import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import BranchActions from "./BranchActions";
import BranchStatusBadge from "./BranchStatusBadge";

import type { BranchDto } from "../../types/org.types";

interface BranchTableProps {
  branches: BranchDto[];
  loading?: boolean;

  onEdit?: (branch: BranchDto) => void;
  onChangeStatus?: (branch: BranchDto) => void;
  onSetDefault?: (branch: BranchDto) => void;
}

const BranchTable = ({
  branches,
  loading = false,
  onEdit,
  onChangeStatus,
  onSetDefault,
}: BranchTableProps) => {
  if (loading) {
    return <p>Loading branches...</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Manager</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Default</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {branches.map((branch) => (
          <TableRow key={branch.id}>
            <TableCell className="font-medium">{branch.name}</TableCell>

            <TableCell>{branch.code}</TableCell>

            <TableCell>{branch.branchType}</TableCell>

            <TableCell>
              {branch.manager
                ? [branch.manager.firstName, branch.manager.lastName]
                    .filter(Boolean)
                    .join(" ")
                : "-"}
            </TableCell>

            <TableCell>
              <BranchStatusBadge status={branch.status} />
            </TableCell>

            <TableCell>{branch.defaultBranch ? "Yes" : "No"}</TableCell>

            <TableCell className="text-right">
              <BranchActions
                branch={branch}
                onEdit={onEdit}
                onChangeStatus={onChangeStatus}
                onSetDefault={onSetDefault}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BranchTable;
