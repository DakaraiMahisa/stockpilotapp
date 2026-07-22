import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";
import { Button, Input, Switch } from "@/components/ui";
import SettingsCard from "@/components/common/SettingsCard";
import {
  passwordPolicySchema,
  type PasswordPolicyFormData,
} from "../../schema/validation/passwordPolicy.schema";

import type {
  PasswordPolicyDto,
  UpdatePasswordPolicyRequest,
} from "../../types/orgSettings.types";

interface PasswordPolicyCardProps {
  policy: PasswordPolicyDto;
  loading?: boolean;
  canEditPassword?: boolean;
  onSave: (request: UpdatePasswordPolicyRequest) => void;
}

const PasswordPolicyCard = ({
  policy,
  loading = false,
  onSave,
}: PasswordPolicyCardProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PasswordPolicyFormData>({
    resolver: zodResolver(passwordPolicySchema),
    defaultValues: {
      minPasswordLength: policy.minPasswordLength,
      requireUppercase: policy.requireUppercase,
      requireNumber: policy.requireNumber,
      requireSpecialChar: policy.requireSpecialChar,
      passwordExpiryDays: policy.passwordExpiryDays,
      maxLoginAttempts: policy.maxLoginAttempts,
      lockoutDurationMins: policy.lockoutDurationMins,
    },
  });

  useEffect(() => {
    reset({
      minPasswordLength: policy.minPasswordLength,
      requireUppercase: policy.requireUppercase,
      requireNumber: policy.requireNumber,
      requireSpecialChar: policy.requireSpecialChar,
      passwordExpiryDays: policy.passwordExpiryDays,
      maxLoginAttempts: policy.maxLoginAttempts,
      lockoutDurationMins: policy.lockoutDurationMins,
    });
  }, [policy, reset]);

  const submit = (data: PasswordPolicyFormData) => {
    onSave(data);
  };
  const { hasPermission } = usePermissions();

  const canEdit = hasPermission(
    PERMISSIONS.ORG_SETTINGS_UPDATE_PASSWORD_POLICY,
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <SettingsCard
        title="Password Policy"
        description="Configure password complexity, password expiry and account lockout rules."
        footer={
          <Button
            type="submit"
            loading={loading}
            disabled={!isDirty || !canEdit}
          >
            Save Changes
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            type="number"
            label="Minimum Password Length"
            error={errors.minPasswordLength?.message}
            {...register("minPasswordLength", {
              valueAsNumber: true,
            })}
          />

          <Input
            type="number"
            label="Password Expiry (Days)"
            error={errors.passwordExpiryDays?.message}
            {...register("passwordExpiryDays", {
              valueAsNumber: true,
            })}
          />

          <Input
            type="number"
            label="Maximum Login Attempts"
            error={errors.maxLoginAttempts?.message}
            {...register("maxLoginAttempts", {
              valueAsNumber: true,
            })}
          />

          <Input
            type="number"
            label="Lockout Duration (Minutes)"
            error={errors.lockoutDurationMins?.message}
            {...register("lockoutDurationMins", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="mt-8 space-y-5">
          <Controller
            control={control}
            name="requireUppercase"
            render={({ field }) => (
              <Switch
                label="Require Uppercase Letter"
                description="Passwords must contain at least one uppercase character."
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="requireNumber"
            render={({ field }) => (
              <Switch
                label="Require Number"
                description="Passwords must contain at least one numeric digit."
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="requireSpecialChar"
            render={({ field }) => (
              <Switch
                label="Require Special Character"
                description="Passwords must contain at least one special symbol."
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </SettingsCard>
    </form>
  );
};

export default PasswordPolicyCard;
