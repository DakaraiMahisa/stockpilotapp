import { Button } from "@/components/ui";

interface FormActionsProps {
  saving?: boolean;
  disabled?: boolean;
  showCancel?: boolean;
  submitLabel?: string;
  savingLabel?: string;
  formId?: string;
  onCancel?: () => void;
}

export default function FormActions({
  saving = false,
  disabled = false,
  showCancel = false,
  submitLabel,
  savingLabel,
  formId,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 border-t pt-6">
      {showCancel && (
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      )}

      <Button type="submit" form={formId} disabled={disabled || saving}>
        {saving
          ? (savingLabel ?? "Saving...")
          : (submitLabel ?? "Save Changes")}
      </Button>
    </div>
  );
}
