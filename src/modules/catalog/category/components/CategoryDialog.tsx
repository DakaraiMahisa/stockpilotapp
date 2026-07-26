import type { ReactNode } from "react";

import { Modal } from "@/components/ui";

interface CategoryDialogProps {
  open: boolean;
  mode: "create" | "edit";
  saving?: boolean;
  children: ReactNode;
  onClose: () => void;
}

const CategoryDialog = ({
  open,
  mode,
  saving = false,
  children,
  onClose,
}: CategoryDialogProps) => {
  return (
    <Modal
      open={open}
      size="lg"
      title={mode === "create" ? "Create Category" : "Edit Category"}
      description={
        mode === "create"
          ? "Create a new category to organize your product catalog."
          : "Update the selected category."
      }
      closeOnOverlayClick={!saving}
      onClose={onClose}
    >
      {children}
    </Modal>
  );
};

export default CategoryDialog;
