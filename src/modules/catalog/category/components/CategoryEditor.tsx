import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { notifier } from "@/lib/notifications/notifier";
import { getErrorMessage } from "@/lib/errorHandler";

import CategoryDialog from "./CategoryDialog";
import CategoryForm from "./CategoryForm";

import {
  useCategory,
  useCreateCategory,
  useUpdateCategory,
} from "../hooks/useCategory";

import {
  categorySchema,
  type CategoryFormData,
} from "../schema/category.schema";

interface CategoryEditorProps {
  open: boolean;
  mode: "create" | "edit";
  categoryId?: string;
  onClose: () => void;
}

const CategoryEditor = ({
  open,
  mode,
  categoryId,
  onClose,
}: CategoryEditorProps) => {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      parentId: undefined,
      sortOrder: 0,
      active: true,
    },
  });

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const { data: categoryResponse, isLoading: loadingCategory } = useCategory(
    categoryId ?? "",
  );
  useEffect(() => {
    if (!open) {
      return;
    }

    if (mode === "create") {
      form.reset({
        name: "",
        code: "",
        description: "",
        parentId: undefined,
        sortOrder: 0,
        active: true,
      });

      return;
    }

    const category = categoryResponse?.data;

    if (!category) {
      return;
    }

    form.reset({
      name: category.name,
      code: category.code,
      description: category.description ?? "",
      parentId: category.parentId ?? undefined,
      sortOrder: category.sortOrder,
      active: category.active,
    });
  }, [open, mode, categoryResponse, form]);

  const handleSubmit = async (values: CategoryFormData) => {
    try {
      if (mode === "create") {
        await createCategoryMutation.mutateAsync({
          name: values.name,
          code: values.code,
          description: values.description || undefined,
          parentId: values.parentId ?? null,
          sortOrder: values.sortOrder,
        });

        notifier.success("Category created successfully.");
      } else {
        if (!categoryId) {
          throw new Error("Category ID is missing.");
        }

        await updateCategoryMutation.mutateAsync({
          categoryId,
          request: {
            name: values.name,
            description: values.description || undefined,
            sortOrder: values.sortOrder,
            active: values.active,
          },
        });

        notifier.success("Category updated successfully.");
      }

      form.reset();
      onClose();
    } catch (error) {
      notifier.error(getErrorMessage(error));
    }
  };

  return (
    <CategoryDialog
      open={open}
      mode={mode}
      saving={
        createCategoryMutation.isPending || updateCategoryMutation.isPending
      }
      onClose={onClose}
    >
      <CategoryForm
        form={form}
        editing={mode === "edit"}
        excludeCategoryId={categoryId}
        submitting={
          loadingCategory ||
          createCategoryMutation.isPending ||
          updateCategoryMutation.isPending
        }
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </CategoryDialog>
  );
};

export default CategoryEditor;
