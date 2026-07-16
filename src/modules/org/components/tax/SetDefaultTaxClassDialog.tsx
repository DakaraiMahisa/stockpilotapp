import FormActions from "@/components/form/FormActions";
import { Modal } from "@/components/ui";

import type { TaxClassDto } from "../../types/tax.types";

interface SetDefaultTaxClassDialogProps {
  open: boolean;
  taxClass: TaxClassDto | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SetDefaultTaxClassDialog = ({
  open,
  taxClass,
  isSubmitting = false,
  onClose,
  onConfirm,
}: SetDefaultTaxClassDialogProps) => {
  if (!taxClass) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title="Set Default Tax Class"
      description="This tax class will become the default tax class for your organization."
    >
      <div className="space-y-6">
        <div className="rounded-lg border bg-muted/20 p-4">
          <p className="text-sm text-muted-foreground">Selected Tax Class</p>

          <p className="mt-1 font-medium">{taxClass.name}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Code: {taxClass.code}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Type: {taxClass.taxType}
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            Setting this tax class as the default will automatically remove the
            default designation from the current default tax class.
          </p>
        </div>

        <FormActions
          formId="set-default-tax-class-form"
          saving={isSubmitting}
          showCancel
          onCancel={onClose}
          submitLabel="Set Default Tax Class"
          savingLabel="Updating..."
        />
      </div>

      <form
        id="set-default-tax-class-form"
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
        }}
      />
    </Modal>
  );
};

export default SetDefaultTaxClassDialog;
