import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";
import { Button, Input, Switch } from "@/components/ui";
import SettingsCard from "@/components/common/SettingsCard";

import {
  invitePolicySchema,
  type InvitePolicyFormData,
} from "../../schema/validation/invitePolicy.schema";

import type {
  InvitePolicyDto,
  UpdateInvitePolicyRequest,
} from "../../types/orgSettings.types";

interface InvitePolicyCardProps {
  policy: InvitePolicyDto;
  loading?: boolean;
  canEditInvite?: boolean;
  onSave: (request: UpdateInvitePolicyRequest) => void;
}

const InvitePolicyCard = ({
  policy,
  loading = false,
  onSave,
}: InvitePolicyCardProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<InvitePolicyFormData>({
    resolver: zodResolver(invitePolicySchema),
    defaultValues: {
      inviteExpiryHours: policy.inviteExpiryHours,
      allowSelfRegistration: policy.allowSelfRegistration,
      requireEmailVerification: policy.requireEmailVerification,
    },
  });

  useEffect(() => {
    reset({
      inviteExpiryHours: policy.inviteExpiryHours,
      allowSelfRegistration: policy.allowSelfRegistration,
      requireEmailVerification: policy.requireEmailVerification,
    });
  }, [policy, reset]);

  const submit = (data: InvitePolicyFormData) => {
    onSave(data);
  };

  const { hasPermission } = usePermissions();

  const canEdit = hasPermission(PERMISSIONS.ORG_SETTINGS_UPDATE_INVITE_POLICY);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <SettingsCard
        title="Invite Policy"
        description="Control how user invitations and self-registration are handled."
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
            label="Invite Expiry (Hours)"
            error={errors.inviteExpiryHours?.message}
            {...register("inviteExpiryHours", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="mt-8 space-y-5">
          <Controller
            control={control}
            name="allowSelfRegistration"
            render={({ field }) => (
              <Switch
                label="Allow Self Registration"
                description="Allow users to create their own accounts without an invitation."
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="requireEmailVerification"
            render={({ field }) => (
              <Switch
                label="Require Email Verification"
                description="Users must verify their email address before their account becomes active."
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

export default InvitePolicyCard;
