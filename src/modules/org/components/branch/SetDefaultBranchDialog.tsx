import FormActions from "@/components/form/FormActions";
import { Modal } from "@/components/ui";

import type { BranchDto } from "../../types/org.types";

interface SetDefaultBranchDialogProps {
  open: boolean;
  branch: BranchDto | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SetDefaultBranchDialog = ({
  open,
  branch,
  isSubmitting = false,
  onClose,
  onConfirm,
}: SetDefaultBranchDialogProps) => {
  if (!branch) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title="Set Default Branch"
      description="This branch will become the default branch for your organization."
    >
      <div className="space-y-6">
        <div className="rounded-lg border bg-muted/20 p-4">
          <p className="text-sm text-muted-foreground">Selected Branch</p>

          <p className="mt-1 font-medium">{branch.name}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Code: {branch.code}
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            Setting this branch as the default will automatically remove the
            default designation from the current default branch.
          </p>
        </div>

        <FormActions
          formId="set-default-branch-form"
          saving={isSubmitting}
          showCancel
          onCancel={onClose}
          submitLabel="Set Default Branch"
          savingLabel="Updating..."
        />
      </div>

      <form
        id="set-default-branch-form"
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
        }}
      />
    </Modal>
  );
};

export default SetDefaultBranchDialog;
