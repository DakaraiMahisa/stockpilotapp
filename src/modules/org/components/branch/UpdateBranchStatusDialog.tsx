import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import FormActions from "@/components/form/FormActions";
import { Modal } from "@/components/ui";

import { BranchStatus, type BranchDto } from "../../types/org.types";

interface UpdateBranchStatusDialogProps {
  branch: BranchDto | null;
  open: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: (status: BranchStatus) => void;
}

interface UpdateBranchStatusFormValues {
  status: BranchStatus;
}

const allowedTransitions: Record<BranchStatus, BranchStatus[]> = {
  DRAFT: ["ACTIVE", "ARCHIVED"],
  ACTIVE: ["INACTIVE"],
  INACTIVE: ["ACTIVE", "ARCHIVED"],
  ARCHIVED: [],
};

const statusLabels: Record<BranchStatus, string> = {
  DRAFT: "Draft",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  ARCHIVED: "Archived",
};

const UpdateBranchStatusDialog = ({
  branch,
  open,
  isSubmitting = false,
  onClose,
  onConfirm,
}: UpdateBranchStatusDialogProps) => {
  const { control, handleSubmit, reset } =
    useForm<UpdateBranchStatusFormValues>({
      defaultValues: {
        status: BranchStatus.DRAFT,
      },
    });

  const transitions = branch ? allowedTransitions[branch.status] : [];

  useEffect(() => {
    if (!open || !branch) {
      return;
    }

    reset({
      status: transitions.length > 0 ? transitions[0] : BranchStatus.ARCHIVED,
    });
  }, [open, branch, transitions, reset]);

  if (!branch) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title="Update Branch Status"
      description="Change the operational status of this branch."
    >
      <form
        onSubmit={handleSubmit((values) => onConfirm(values.status))}
        className="space-y-6"
      >
        <div className="rounded-lg border bg-muted/20 p-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Branch</p>

            <p className="font-medium">{branch.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Current Status</p>

            <p className="font-medium">{statusLabels[branch.status]}</p>
          </div>
        </div>

        {transitions.length > 0 ? (
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              New Status
            </label>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="status"
                  className="w-full rounded-lg border px-3 py-2"
                >
                  {transitions.map((transition) => (
                    <option key={transition} value={transition}>
                      {statusLabels[transition]}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        ) : (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              Archived branches cannot change status.
            </p>
          </div>
        )}

        <FormActions
          saving={isSubmitting}
          showCancel
          onCancel={onClose}
          submitLabel="Update Status"
          savingLabel="Updating..."
          disabled={transitions.length === 0}
        />
      </form>
    </Modal>
  );
};

export default UpdateBranchStatusDialog;
