import {
  ChevronDown,
  ChevronRight,
  Edit,
  Folder,
  Move,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Button, Card } from "@/components/ui";

import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";

import CategoryStatusBadge from "./CategoryStatusBadge";

import type { CategoryTreeDto } from "../types/category.types";

interface CategoryTreeNodeProps {
  category: CategoryTreeDto;
  level?: number;
  onEdit: (category: CategoryTreeDto) => void;
  onMove: (category: CategoryTreeDto) => void;
  onDelete: (category: CategoryTreeDto) => void;
}

const CategoryTreeNode = ({
  category,
  level = 0,
  onEdit,
  onMove,
  onDelete,
}: CategoryTreeNodeProps) => {
  const [expanded, setExpanded] = useState(true);

  const { hasPermission } = usePermissions();

  const hasChildren = category.children.length > 0;

  return (
    <div className="space-y-3">
      <Card className="p-4">
        <div
          className="flex items-center justify-between gap-4"
          style={{ paddingLeft: `${level * 24}px` }}
        >
          <div className="flex min-w-0 items-center gap-3">
            {hasChildren ? (
              <Button
                variant="outline"
                size="sm"
                className="px-2"
                onClick={() => setExpanded((value) => !value)}
              >
                {expanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <div className="w-9" />
            )}

            <Folder className="h-5 w-5 text-brand" />

            <div className="min-w-0">
              <h3 className="truncate font-medium text-text-primary">
                {category.name}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                <span>{category.code}</span>

                <span>•</span>

                <span>Sort: {category.sortOrder}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CategoryStatusBadge active={category.active} />

            {hasPermission(PERMISSIONS.CATEGORY_UPDATE) && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(category)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}

            {hasPermission(PERMISSIONS.CATEGORY_MOVE) && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onMove(category)}
              >
                <Move className="mr-2 h-4 w-4" />
                Move
              </Button>
            )}

            {hasPermission(PERMISSIONS.CATEGORY_DELETE) && (
              <Button
                size="sm"
                variant="danger"
                leftIcon={<Trash2 className="h-4 w-4" />}
                onClick={() => onDelete(category)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </Card>

      {expanded &&
        hasChildren &&
        category.children.map((child) => (
          <CategoryTreeNode
            key={child.id}
            category={child}
            level={level + 1}
            onEdit={onEdit}
            onMove={onMove}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default CategoryTreeNode;
