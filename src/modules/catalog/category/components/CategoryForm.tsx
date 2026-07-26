import { Controller, type UseFormReturn } from "react-hook-form";

import { Input, Textarea } from "@/components/ui";
import { FormActions, FormSection } from "@/components/form";

import CategoryTreeSelect from "./CategoryTreeSelect";

import type { CategoryFormData } from "../schema/category.schema";

interface CategoryFormProps {
  form: UseFormReturn<CategoryFormData>;
  submitting?: boolean;
  editing?: boolean;
  excludeCategoryId?: string;
  onSubmit: (values: CategoryFormData) => void;
  onCancel: () => void;
}

const FORM_ID = "category-form";

const CategoryForm = ({
  form,
  submitting = false,
  editing = false,
  excludeCategoryId,
  onSubmit,
  onCancel,
}: CategoryFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = form;

  return (
    <>
      <form
        id={FORM_ID}
        className="space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSection
          title="Category Information"
          description="Define the basic details of the category."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Category Name"
              placeholder="e.g Electronics"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Category Code"
              placeholder="e.g ELEC"
              disabled={editing}
              error={errors.code?.message}
              {...register("code")}
            />
          </div>
          {!editing && (
            <Controller
              control={control}
              name="parentId"
              render={({ field }) => (
                <CategoryTreeSelect
                  value={field.value}
                  excludeId={excludeCategoryId}
                  onChange={field.onChange}
                />
              )}
            />
          )}
          <Textarea
            label="Description"
            rows={4}
            placeholder="Optional description"
            error={errors.description?.message}
            {...register("description")}
          />

          <Input
            type="number"
            label="Sort Order"
            placeholder="0"
            error={errors.sortOrder?.message}
            {...register("sortOrder", {
              valueAsNumber: true,
            })}
          />
        </FormSection>
      </form>

      <FormActions
        formId={FORM_ID}
        saving={submitting}
        disabled={!isDirty}
        showCancel
        submitLabel={editing ? "Update Category" : "Create Category"}
        savingLabel={editing ? "Updating..." : "Creating..."}
        onCancel={onCancel}
      />
    </>
  );
};

export default CategoryForm;
