import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui";

import FormActions from "@/components/form/FormActions";
import FormSection from "@/components/form/FormSection";

import { branchFormSchema, type BranchFormValues } from "./branchFormSchema";

import { BranchType } from "../../types/org.types";

interface BranchFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<BranchFormValues>;
  isSubmitting?: boolean;
  onSubmit: (values: BranchFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

const BranchForm = ({
  mode,
  initialValues,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: BranchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BranchFormValues>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      name: "",
      code: "",
      branchType: BranchType.RETAIL,
      phone: "",
      email: "",
      addressLine1: "",
      city: "",
      managerId: null,
      ...initialValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormSection
        title="Branch Information"
        description="Basic information about the branch."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Branch Name"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Branch Code"
            {...register("code")}
            error={errors.code?.message}
          />

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              Branch Type
            </label>

            <select
              {...register("branchType")}
              className="w-full rounded-md border px-3 py-2"
            >
              {Object.values(BranchType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {errors.branchType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.branchType.message}
              </p>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Contact Information"
        description="How customers can contact this branch."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Phone"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <Input
            label="Email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
      </FormSection>

      <FormSection
        title="Location"
        description="Physical location of the branch."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Address"
            {...register("addressLine1")}
            error={errors.addressLine1?.message}
          />

          <Input
            label="City"
            {...register("city")}
            error={errors.city?.message}
          />
        </div>
      </FormSection>

      <FormSection title="Management" description="Assign a branch manager.">
        <Input
          label="Manager ID"
          {...register("managerId")}
          error={errors.managerId?.message}
        />
      </FormSection>

      <FormActions
        saving={isSubmitting}
        showCancel={!!onCancel}
        onCancel={onCancel}
        submitLabel={mode === "create" ? "Create Branch" : "Save Changes"}
      />
    </form>
  );
};

export default BranchForm;
