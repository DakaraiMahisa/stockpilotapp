import { Plus } from "lucide-react";

import { PageHeader } from "@/components/common";
import { Button } from "@/components/ui";

import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { notifier } from "@/lib/notifications/notifier";

interface CategoryToolbarProps {
  onCreate: () => void;
}

const CategoryToolbar = ({ onCreate }: CategoryToolbarProps) => {
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
    <PageHeader
      title="Categories"
      description="Organize your product catalog into a hierarchical structure."
    >
      <Button onClick={handleCreate}>
        <Plus className="h-4 w-4" />
        <span>Create Category</span>
      </Button>
    </PageHeader>
  );
};

export default CategoryToolbar;
