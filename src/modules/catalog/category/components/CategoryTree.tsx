import CategoryTreeNode from "../components/CategoryTreeNode";
import type { CategoryTreeDto } from "../types/category.types";

interface CategoryTreeProps {
  categories: CategoryTreeDto[];
  onEdit: (category: CategoryTreeDto) => void;
  onMove: (category: CategoryTreeDto) => void;
  onDelete: (category: CategoryTreeDto) => void;
}

const CategoryTree = ({
  categories,
  onEdit,
  onMove,
  onDelete,
}: CategoryTreeProps) => {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <CategoryTreeNode
          key={category.id}
          category={category}
          onEdit={onEdit}
          onMove={onMove}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryTree;
