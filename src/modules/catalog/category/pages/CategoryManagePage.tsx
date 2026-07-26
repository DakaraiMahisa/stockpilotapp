import { useState } from "react";
import { Navigate } from "react-router-dom";

import { PageHeader } from "@/components/common";
import { EmptyState, Skeleton } from "@/components/feedback";
import { Card } from "@/components/ui";

import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import CategoryEditor from "../components/CategoryEditor";
import CategoryToolbar from "../components/CategoryToolbar";
import CategoryTree from "../components/CategoryTree";
import DeleteCategoryDialog from "../components/DeleteCategoryDialog";
import EmptyCategoryState from "../components/EmptyCategoryState";
import MoveCategoryDialog from "../components/MoveCategoryDialog";

import { useCategoryTree } from "../hooks/useCategory";

import type { CategoryTreeDto } from "../types/category.types";

const CategoryManagePage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryTreeDto | null>(null);

  const [deleteCategory, setDeleteCategory] = useState<CategoryTreeDto | null>(
    null,
  );

  const [moveCategory, setMoveCategory] = useState<CategoryTreeDto | null>(
    null,
  );

  const { data, isLoading, isError } = useCategoryTree();

  const { hasPermission } = usePermissions();

  const canRead = hasPermission(PERMISSIONS.CATEGORY_READ);

  if (!canRead) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (isError || !data?.data) {
    return (
      <EmptyState
        title="Unable to load categories"
        description="Please refresh the page or try again later."
      />
    );
  }

  const categories = data.data;

  const handleCreate = () => {
    setSelectedCategory(null);
    setDialogMode("create");
    setDialogOpen(true);
  };

  const handleEdit = (category: CategoryTreeDto) => {
    setSelectedCategory(category);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const closeCategoryDialog = () => {
    setDialogOpen(false);
    setSelectedCategory(null);
  };

  const closeDeleteDialog = () => {
    setDeleteCategory(null);
  };

  const closeMoveDialog = () => {
    setMoveCategory(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category Management"
        description="Create and organize hierarchical product categories for your catalog."
      />

      <Card className="space-y-6">
        <CategoryToolbar onCreate={handleCreate} />

        {categories.length === 0 ? (
          <EmptyCategoryState onCreate={handleCreate} />
        ) : (
          <CategoryTree
            categories={categories}
            onEdit={handleEdit}
            onMove={setMoveCategory}
            onDelete={setDeleteCategory}
          />
        )}
      </Card>

      <CategoryEditor
        open={dialogOpen}
        mode={dialogMode}
        categoryId={selectedCategory?.id}
        onClose={closeCategoryDialog}
      />

      <DeleteCategoryDialog
        open={deleteCategory !== null}
        categoryId={deleteCategory?.id}
        categoryName={deleteCategory?.name}
        onClose={closeDeleteDialog}
      />

      <MoveCategoryDialog
        open={moveCategory !== null}
        categoryId={moveCategory?.id}
        currentParentId={moveCategory?.parentId}
        excludeCategoryId={moveCategory?.id}
        onClose={closeMoveDialog}
      />
    </div>
  );
};

export default CategoryManagePage;
