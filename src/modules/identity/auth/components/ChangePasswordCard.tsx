import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle } from "react";
import { Button, Input } from "@/components/ui";
import SettingsCard from "@/components/common/SettingsCard";

import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../schemas/changePassword.schema";

import type { ChangePasswordRequest } from "../types/auth";

interface ChangePasswordCardProps {
  loading?: boolean;
  onSave: (request: ChangePasswordRequest) => void;
}
export interface ChangePasswordCardRef {
  reset: () => void;
}
const ChangePasswordCard = forwardRef<
  ChangePasswordCardRef,
  ChangePasswordCardProps
>(({ loading = false, onSave }, ref) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  useImperativeHandle(ref, () => ({
    reset,
  }));
  const submit = (data: ChangePasswordFormData) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <SettingsCard
        title="Change Password"
        description="Update your account password. Choose a strong password that you do not use elsewhere."
        footer={
          <Button type="submit" loading={loading} disabled={!isDirty}>
            Update Password
          </Button>
        }
      >
        <div className="space-y-6">
          <Controller
            control={control}
            name="currentPassword"
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                label="Current Password"
                autoComplete="current-password"
                error={errors.currentPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                label="New Password"
                autoComplete="new-password"
                error={errors.newPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                label="Confirm New Password"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </div>
      </SettingsCard>
    </form>
  );
});

export default ChangePasswordCard;
