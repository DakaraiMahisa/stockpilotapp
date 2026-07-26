import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Modal } from "@/components/ui";
import { FormActions } from "@/components/form";

import { notifier } from "@/lib/notifications/notifier";

import CategoryTreeSelect from "./CategoryTreeSelect";

import { useMoveCategory } from "../hooks/useCategory";

import type { MoveCategoryRequest } from "../types/category.types";

interface MoveCategoryDialogProps {
  open: boolean;
  categoryId?: string;
  currentParentId?: string;
  excludeCategoryId?: string;
  onClose: () => void;
}

const FORM_ID = "move-category-form";

const MoveCategoryDialog = ({
  open,
  categoryId,
  currentParentId,
  excludeCategoryId,
  onClose,
}: MoveCategoryDialogProps) => {
  const moveCategory = useMoveCategory();

  const { control, handleSubmit, reset, setValue } =
    useForm<MoveCategoryRequest>({
      defaultValues: {
        newParentId: currentParentId,
      },
    });
  const newParentId = useWatch({
    control,
    name: "newParentId",
  });

  useEffect(() => {
    reset({
      newParentId: currentParentId,
    });
  }, [currentParentId, reset]);

  const onSubmit = async (data: MoveCategoryRequest) => {
    if (!categoryId) {
      return;
    }

    try {
      await moveCategory.mutateAsync({
        categoryId,
        request: data,
      });

      notifier.success("Category moved successfully.");

      onClose();
    } catch {
      notifier.error("Failed to move category.");
    }
  };

  return (
    <Modal
      open={open}
      size="md"
      title="Move Category"
      description="Select a new parent category."
      onClose={onClose}
    >
      <form
        id={FORM_ID}
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CategoryTreeSelect
          value={newParentId}
          excludeId={excludeCategoryId}
          onChange={(value) => setValue("newParentId", value || null)}
        />
      </form>

      <FormActions
        formId={FORM_ID}
        saving={moveCategory.isPending}
        showCancel
        submitLabel="Move Category"
        savingLabel="Moving..."
        onCancel={onClose}
      />
    </Modal>
  );
};

export default MoveCategoryDialog;
