import { Input, Select } from "@/components/ui";
import type { SelectOption } from "@/components/ui";
import type { BrandSummary } from "@/modules/catalog/brand/types/brand.types";
import type { CategoryTreeDto } from "@/modules/catalog/category/types/category.types";

interface ProductToolbarProps {
  search: string;
  categoryId: string;
  brandId: string;
  active: string;
  categories: CategoryTreeDto[];
  brands: BrandSummary[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onActiveChange: (value: string) => void;
}

const flattenCategories = (
  categories: CategoryTreeDto[],
): CategoryTreeDto[] => {
  return categories.flatMap((category) => [
    category,
    ...flattenCategories(category.children ?? []),
  ]);
};

const ProductToolbar = ({
  search,
  categoryId,
  brandId,
  active,
  categories,
  brands,
  onSearchChange,
  onCategoryChange,
  onBrandChange,
  onActiveChange,
}: ProductToolbarProps) => {
  const categoryOptions: SelectOption[] = flattenCategories(categories)
    .filter((category) => category.active && category.leaf)
    .map((category) => ({
      label: category.name,
      value: category.id,
    }));

  const brandOptions: SelectOption[] = brands.map((brand) => ({
    label: brand.name,
    value: brand.id,
  }));

  const statusOptions: SelectOption[] = [
    {
      label: "Active",
      value: "true",
    },
    {
      label: "Inactive",
      value: "false",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          label="Search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <Select
          label="Category"
          options={categoryOptions}
          value={categoryId}
          placeholder="All categories"
          onChange={onCategoryChange}
        />

        <Select
          label="Brand"
          options={brandOptions}
          value={brandId}
          placeholder="All brands"
          onChange={onBrandChange}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={active}
          placeholder="All statuses"
          onChange={onActiveChange}
        />
      </div>
    </div>
  );
};

export default ProductToolbar;
