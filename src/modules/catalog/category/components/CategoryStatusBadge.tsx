import { Badge } from "@/components/ui/badge";

interface CategoryStatusBadgeProps {
  active: boolean;
}

const CategoryStatusBadge = ({ active }: CategoryStatusBadgeProps) => {
  return (
    <Badge variant={active ? "default" : "secondary"}>
      {active ? "Active" : "Inactive"}
    </Badge>
  );
};

export default CategoryStatusBadge;
