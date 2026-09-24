import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Select, Switch, Textarea } from "@/components/ui";

import { useActiveBrands } from "@/modules/catalog/brand/hooks/useBrand";
import { useCategoryTree } from "@/modules/catalog/category/hooks/useCategory";
import { useTaxClasses } from "@/modules/org/hooks/useTaxClasses";
import type { CategoryTreeDto } from "@/modules/catalog/category/types/category.types";

import {
  productCreateSchema,
  productUpdateSchema,
  type ProductCreateFormValues,
  type ProductUpdateFormValues,
} from "../schema/product.schemas";

import type { Product, UnitOfMeasure } from "../types/product.types";

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product | null;
  isSubmitting?: boolean;
  onSubmit: (values: ProductCreateFormValues | ProductUpdateFormValues) => void;
  onCancel: () => void;
}

const UNIT_OPTIONS = [
  { label: "Pieces", value: "PCS" },
  { label: "Kilograms", value: "KG" },
  { label: "Grams", value: "G" },
  { label: "Litres", value: "LTR" },
  { label: "Millilitres", value: "ML" },
  { label: "Box", value: "BOX" },
  { label: "Pack", value: "PACK" },
  { label: "Roll", value: "ROLL" },
  { label: "Metres", value: "MTR" },
] as const;

const flattenCategories = (
  categories: CategoryTreeDto[],
): CategoryTreeDto[] => {
  return categories.flatMap((category) => [
    category,
    ...flattenCategories(category.children ?? []),
  ]);
};

const ProductForm = ({
  mode,
  product,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const isEdit = mode === "edit";

  const { data: brandResponse, isLoading: brandsLoading } = useActiveBrands();

  const { data: categoryResponse, isLoading: categoriesLoading } =
    useCategoryTree();

  const { data: taxResponse, isLoading: taxesLoading } = useTaxClasses(true);

  const categories = categoryResponse?.data ?? [];
  const brands = brandResponse?.data ?? [];
  const taxClasses = taxResponse?.data ?? [];

  const flattenedCategories = flattenCategories(categories);

  const categoryOptions = flattenedCategories
    .filter((category) => category.active && category.leaf)
    .map((category) => ({
      label: category.name,
      value: category.id,
    }));

  const brandOptions = brands.map((brand) => ({
    label: brand.name,
    value: brand.id,
  }));

  const taxClassOptions = taxClasses.map((taxClass) => ({
    label: `${taxClass.name} (${taxClass.code})`,
    value: taxClass.id,
  }));

  const form = useForm<ProductCreateFormValues | ProductUpdateFormValues>({
    resolver: zodResolver(isEdit ? productUpdateSchema : productCreateSchema),
    defaultValues: isEdit
      ? {
          barcode: product?.barcode ?? "",
          name: product?.name ?? "",
          description: product?.description ?? "",
          brandId: product?.brandId ?? "",
          categoryId: product?.categoryId ?? "",
          taxClassId: product?.taxClassId ?? "",
          unitOfMeasure: product?.unitOfMeasure,
          trackBatches: product?.trackBatches ?? false,
          minStockLevel: product?.minStockLevel ?? 0,
          maxStockLevel: product?.maxStockLevel ?? 0,
          active: product?.active ?? true,
          service: product?.service ?? false,
          weightKg: product?.weightKg ?? undefined,
          notes: product?.notes ?? "",
        }
      : {
          sku: "",
          barcode: "",
          name: "",
          description: "",
          brandId: "",
          categoryId: "",
          taxClassId: "",
          unitOfMeasure: "PCS",
          trackBatches: false,
          minStockLevel: 0,
          maxStockLevel: 0,
          service: false,
          weightKg: undefined,
          notes: "",
        },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!isEdit || !product) {
      return;
    }

    reset({
      barcode: product.barcode ?? "",
      name: product.name,
      description: "",
      brandId: product.brandId ?? "",
      categoryId: product.categoryId,
      taxClassId: product.taxClassId,
      unitOfMeasure: product.unitOfMeasure,
      trackBatches: product.trackBatches,
      minStockLevel: product.minStockLevel,
      maxStockLevel: product.maxStockLevel,
      active: product.active,
      service: product.service,
      weightKg: product.weightKg ?? undefined,
      notes: product.notes ?? "",
    });
  }, [isEdit, product, reset]);

  const trackBatches = useWatch({
    control: form.control,
    name: "trackBatches",
  });

  const service = useWatch({
    control: form.control,
    name: "service",
  });

  const active = useWatch({
    control: form.control,
    name: "active",
  });

  const unitOfMeasure = useWatch({
    control: form.control,
    name: "unitOfMeasure",
  });

  const categoryId = useWatch({
    control: form.control,
    name: "categoryId",
  });

  const brandId = useWatch({
    control: form.control,
    name: "brandId",
  });

  const taxClassId = useWatch({
    control: form.control,
    name: "taxClassId",
  });

  const submit = (
    values: ProductCreateFormValues | ProductUpdateFormValues,
  ) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8">
      {/* Product Information */}
      <section className="space-y-5">
        <div>
          <h2 className="text-base font-semibold text-text-primary">
            Product Information
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Basic information used to identify the product.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {!isEdit && (
            <Input
              label="SKU"
              placeholder="Leave empty to generate automatically"
              {...register("sku")}
              error={"sku" in errors ? errors.sku?.message : undefined}
            />
          )}

          {isEdit && <Input label="SKU" value={product?.sku ?? ""} disabled />}

          <Input
            label="Product Name"
            placeholder="Enter product name"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Barcode"
            placeholder="Enter barcode"
            {...register("barcode")}
            error={errors.barcode?.message}
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={categoryId ?? ""}
            placeholder={
              categoriesLoading ? "Loading categories..." : "Select category"
            }
            disabled={categoriesLoading}
            error={errors.categoryId?.message}
            onChange={(value) =>
              setValue("categoryId", value, {
                shouldValidate: true,
              })
            }
          />

          <Select
            label="Brand"
            options={brandOptions}
            value={brandId ?? ""}
            placeholder={
              brandsLoading ? "Loading brands..." : "Select brand (optional)"
            }
            disabled={brandsLoading}
            error={errors.brandId?.message}
            onChange={(value) =>
              setValue("brandId", value, {
                shouldValidate: true,
              })
            }
          />

          <Select
            label="Tax Class"
            options={taxClassOptions}
            value={taxClassId ?? ""}
            placeholder={
              taxesLoading ? "Loading tax classes..." : "Select tax class"
            }
            disabled={taxesLoading}
            error={errors.taxClassId?.message}
            onChange={(value) =>
              setValue("taxClassId", value, {
                shouldValidate: true,
              })
            }
          />

          <Select
            label="Unit of Measure"
            options={UNIT_OPTIONS}
            value={unitOfMeasure ?? ""}
            onChange={(value) =>
              setValue("unitOfMeasure", value as UnitOfMeasure, {
                shouldValidate: true,
              })
            }
            error={errors.unitOfMeasure?.message}
          />
        </div>
      </section>

      {/* Inventory */}
      <section className="space-y-5 border-t border-border pt-8">
        <div>
          <h2 className="text-base font-semibold text-text-primary">
            Inventory
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Configure inventory tracking and stock thresholds.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Switch
              checked={Boolean(trackBatches)}
              onCheckedChange={(checked) =>
                setValue("trackBatches", checked, {
                  shouldValidate: true,
                })
              }
              label="Track batches"
            />
          </div>

          <Input
            label="Minimum Stock Level"
            type="number"
            min={0}
            step={1}
            {...register("minStockLevel", {
              valueAsNumber: true,
            })}
            error={errors.minStockLevel?.message}
          />

          <Input
            label="Maximum Stock Level"
            type="number"
            min={0}
            step={1}
            {...register("maxStockLevel", {
              valueAsNumber: true,
            })}
            error={errors.maxStockLevel?.message}
          />
        </div>
      </section>

      {/* Product Properties */}
      <section className="space-y-5 border-t border-border pt-8">
        <div>
          <h2 className="text-base font-semibold text-text-primary">
            Product Properties
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Configure how the product behaves in the catalog.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Switch
            checked={Boolean(service)}
            onCheckedChange={(checked) =>
              setValue("service", checked, {
                shouldValidate: true,
              })
            }
            label="Service product"
          />

          <Input
            label="Weight (kg)"
            type="number"
            min={0}
            step="0.001"
            placeholder="0.000"
            {...register("weightKg", {
              valueAsNumber: true,
            })}
            error={errors.weightKg?.message}
          />
        </div>
      </section>

      {/* Status */}
      {isEdit && (
        <section className="space-y-5 border-t border-border pt-8">
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Status
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Control whether this product is available.
            </p>
          </div>

          <Switch
            checked={Boolean(active)}
            onCheckedChange={(checked) =>
              setValue("active", checked, {
                shouldValidate: true,
              })
            }
            label="Product is active"
          />
        </section>
      )}

      {/* Additional Information */}
      <section className="space-y-5 border-t border-border pt-8">
        <div>
          <h2 className="text-base font-semibold text-text-primary">
            Additional Information
          </h2>
        </div>

        <div className="space-y-5">
          <Textarea
            label="Description"
            placeholder="Describe the product..."
            {...register("description")}
            error={errors.description?.message}
          />

          <Textarea
            label="Notes"
            placeholder="Internal notes..."
            {...register("notes")}
            error={errors.notes?.message}
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button type="submit" loading={isSubmitting}>
          {isEdit ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
