import { FolderTree, Plus } from "lucide-react";

import { EmptyState } from "@/components/feedback";
import { Button } from "@/components/ui";

import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { notifier } from "@/lib/notifications/notifier";

interface EmptyCategoryStateProps {
  onCreate: () => void;
}

const EmptyCategoryState = ({ onCreate }: EmptyCategoryStateProps) => {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission(PERMISSIONS.CATEGORY_CREATE);

  const handleCreate = () => {
    if (!canCreate) {
      notifier.error("You do not have permission to create categories.");
      return;
    }

    onCreate();
  };

  return (
    <EmptyState
      title="No categories found"
      description="Create your first category to organize products into a structured hierarchy."
      icon={<FolderTree className="h-12 w-12 text-text-secondary" />}
      action={
        canCreate ? (
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4" />
            <span>Create Category</span>
          </Button>
        ) : undefined
      }
    />
  );
};

export default EmptyCategoryState;
