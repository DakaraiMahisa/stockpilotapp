import { useMemo } from "react";

import { Select, type SelectOption } from "@/components/ui";

import { useCategoryTree } from "../hooks/useCategory";

import type { CategoryTreeDto } from "../types/category.types";

interface CategoryTreeSelectProps {
  value?: string | null;
  onChange: (value?: string) => void;
  disabled?: boolean;
  excludeId?: string;
}

const CategoryTreeSelect = ({
  value,
  onChange,
  disabled = false,
  excludeId,
}: CategoryTreeSelectProps) => {
  const { data, isLoading } = useCategoryTree();

  const options = useMemo(() => {
    const flatten = (
      categories: CategoryTreeDto[],
      depth = 0,
    ): SelectOption[] =>
      categories.flatMap((category) => {
        if (category.id === excludeId) {
          return [];
        }

        const prefix = "— ".repeat(depth);

        return [
          {
            label: `${prefix}${category.name}`,
            value: category.id,
          },
          ...flatten(category.children, depth + 1),
        ];
      });

    return flatten(data?.data ?? []);
  }, [data, excludeId]);

  return (
    <Select
      label="Parent Category"
      placeholder="None (Root Category)"
      options={options}
      value={value ?? ""}
      disabled={disabled || isLoading}
      onChange={(value) => onChange(value || undefined)}
    />
  );
};

export default CategoryTreeSelect;
