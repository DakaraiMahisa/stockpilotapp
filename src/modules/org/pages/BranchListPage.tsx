import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/index";

import { useBranches } from "../hooks/useBranches";
import {
  BranchEmptyState,
  BranchSkeleton,
  BranchTable,
  BranchToolbar,
} from "../components/branch";

import { BranchStatus, type BranchDto } from "../types/org.types";

const BranchListPage = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<BranchStatus>();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useBranches({
    page: 0,
    size: 10,
    status,
  });

  const branches = data?.data.content ?? [];

  const handleCreateBranch = () => {
    navigate("/organization/branches/new");
  };

  const handleEditBranch = (branch: BranchDto) => {
    navigate(`/organization/branches/${branch.id}/edit`);
  };

  const handleChangeStatus = (branch: BranchDto) => {
    // TODO: Open Change Status dialog
    console.log("Change status", branch.id);
  };

  const handleSetDefault = (branch: BranchDto) => {
    // TODO: Call setDefaultBranch mutation
    console.log("Set default", branch.id);
  };

  return (
    <div className="space-y-6">
      <BranchToolbar
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onCreateBranch={handleCreateBranch}
      />

      <Card>
        {isLoading ? (
          <BranchSkeleton />
        ) : branches.length === 0 ? (
          <BranchEmptyState onCreateBranch={handleCreateBranch} />
        ) : (
          <BranchTable
            branches={branches}
            onEdit={handleEditBranch}
            onChangeStatus={handleChangeStatus}
            onSetDefault={handleSetDefault}
          />
        )}
      </Card>

      {isError && (
        <p className="text-center text-sm text-red-600">
          Failed to load branches.
        </p>
      )}
    </div>
  );
};

export default BranchListPage;
