import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { notifier } from "@/lib/notifications/notifier";

import { Card } from "@/components/ui/index";

import { useBranches } from "../hooks/useBranches";
import {
  BranchEmptyState,
  BranchSkeleton,
  BranchTable,
  BranchToolbar,
} from "../components/branch";

import { BranchStatus, type BranchDto } from "../types/org.types";
import UpdateBranchStatusDialog from "../components/branch/UpdateBranchStatusDialog";
import SetDefaultBranchDialog from "../components/branch/SetDefaultBranchDialog";

import { useUpdateBranchStatus } from "../hooks/useUpdateBranchStatus";

import { useSetDefaultBranch } from "../hooks/useSetDefaultBranch";

const BranchListPage = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<BranchStatus>();

  const [selectedBranch, setSelectedBranch] = useState<BranchDto | null>(null);

  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const navigate = useNavigate();

  const updateBranchStatus = useUpdateBranchStatus();

  const [defaultDialogOpen, setDefaultDialogOpen] = useState(false);

  const setDefaultBranch = useSetDefaultBranch();

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
    setSelectedBranch(branch);
    setStatusDialogOpen(true);
  };

  const handleCloseStatusDialog = () => {
    setStatusDialogOpen(false);
    setSelectedBranch(null);
  };
  const handleCloseDefaultDialog = () => {
    setDefaultDialogOpen(false);
    setSelectedBranch(null);
  };
  const handleConfirmStatus = async (status: BranchStatus) => {
    if (!selectedBranch) {
      return;
    }

    try {
      await updateBranchStatus.mutateAsync({
        id: selectedBranch.id,
        request: {
          status,
        },
      });

      notifier.success(
        `Branch "${selectedBranch.name}" status updated successfully.`,
      );

      handleCloseStatusDialog();
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ?? "Failed to update branch status.",
        );
      } else {
        notifier.error("An unexpected error occurred.");
      }
    }
  };
  const handleSetDefault = (branch: BranchDto) => {
    setSelectedBranch(branch);
    setDefaultDialogOpen(true);
  };

  const handleConfirmDefault = async () => {
    if (!selectedBranch) {
      return;
    }

    try {
      await setDefaultBranch.mutateAsync(selectedBranch.id);

      notifier.success(`"${selectedBranch.name}" is now the default branch.`);

      setDefaultDialogOpen(false);
      setSelectedBranch(null);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        notifier.error(
          error.response?.data?.message ?? "Failed to set the default branch.",
        );
      } else {
        notifier.error(
          "An unexpected error occurred while setting the default branch.",
        );
      }
    }
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
        <p className="text-center text-sm text-danger">
          Failed to load branches.
        </p>
      )}

      <UpdateBranchStatusDialog
        open={statusDialogOpen}
        branch={selectedBranch}
        isSubmitting={updateBranchStatus.isPending}
        onClose={handleCloseStatusDialog}
        onConfirm={handleConfirmStatus}
      />

      <SetDefaultBranchDialog
        open={defaultDialogOpen}
        branch={selectedBranch}
        isSubmitting={setDefaultBranch.isPending}
        onClose={handleCloseDefaultDialog}
        onConfirm={handleConfirmDefault}
      />
    </div>
  );
};

export default BranchListPage;
