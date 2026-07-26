import { Modal } from "@/components/ui";
import { FormActions } from "@/components/form";

import { notifier } from "@/lib/notifications/notifier";

import { useDeleteCategory } from "../hooks/useCategory";

interface DeleteCategoryDialogProps {
  open: boolean;
  categoryId?: string;
  categoryName?: string;
  onClose: () => void;
}

const FORM_ID = "delete-category-form";

const DeleteCategoryDialog = ({
  open,
  categoryId,
  categoryName,
  onClose,
}: DeleteCategoryDialogProps) => {
  const deleteCategory = useDeleteCategory();

  const handleDelete = async () => {
    if (!categoryId) {
      return;
    }

    try {
      await deleteCategory.mutateAsync(categoryId);

      notifier.success("Category deleted successfully.");
      deleteCategory.reset();
      onClose();
    } catch {
      notifier.error("Failed to delete category.");
    }
  };

  return (
    <Modal
      open={open}
      size="sm"
      title="Delete Category"
      description="This action cannot be undone."
      onClose={onClose}
    >
      <form
        id={FORM_ID}
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          void handleDelete();
        }}
      >
        <p className="text-sm text-text-secondary">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-text-primary">
            {categoryName}
          </span>
          ?
        </p>

        <FormActions
          formId={FORM_ID}
          saving={deleteCategory.isPending}
          submitLabel="Delete"
          savingLabel="Deleting..."
          showCancel
          onCancel={onClose}
        />
      </form>
    </Modal>
  );
};

export default DeleteCategoryDialog;
