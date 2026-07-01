import { Button } from "@/components/ui";

interface FormActionsProps {
  saving?: boolean;
  disabled?: boolean;
  showCancel?: boolean;
  onCancel?: () => void;
}

export default function FormActions({
  saving = false,
  disabled = false,
  showCancel = false,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 border-t pt-6">
      {showCancel && (
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      )}

      <Button type="submit" disabled={disabled || saving}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
