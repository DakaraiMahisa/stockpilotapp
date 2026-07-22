import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";
import { Button, Input, Switch } from "@/components/ui";
import SettingsCard from "@/components/common/SettingsCard";

import {
  sessionPolicySchema,
  type SessionPolicyFormData,
} from "../../schema/validation/sessionPolicy.schema";

import type {
  SessionPolicyDto,
  UpdateSessionPolicyRequest,
} from "../../types/orgSettings.types";

interface SessionPolicyCardProps {
  policy: SessionPolicyDto;
  loading?: boolean;
  canEditSession?: boolean;
  onSave: (request: UpdateSessionPolicyRequest) => void;
}

const SessionPolicyCard = ({
  policy,
  loading = false,
  onSave,
}: SessionPolicyCardProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SessionPolicyFormData>({
    resolver: zodResolver(sessionPolicySchema),
    defaultValues: {
      sessionTimeoutMins: policy.sessionTimeoutMins,
      maxConcurrentSessions: policy.maxConcurrentSessions,
      rememberMeDays: policy.rememberMeDays,
      enforceDeviceTrust: policy.enforceDeviceTrust,
    },
  });

  useEffect(() => {
    reset({
      sessionTimeoutMins: policy.sessionTimeoutMins,
      maxConcurrentSessions: policy.maxConcurrentSessions,
      rememberMeDays: policy.rememberMeDays,
      enforceDeviceTrust: policy.enforceDeviceTrust,
    });
  }, [policy, reset]);

  const submit = (data: SessionPolicyFormData) => {
    onSave(data);
  };
  const { hasPermission } = usePermissions();

  const canEdit = hasPermission(PERMISSIONS.ORG_SETTINGS_UPDATE_SESSION_POLICY);
  return (
    <form onSubmit={handleSubmit(submit)}>
      <SettingsCard
        title="Session Policy"
        description="Configure user session lifetime, concurrent sessions and trusted devices."
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
            label="Session Timeout (Minutes)"
            error={errors.sessionTimeoutMins?.message}
            {...register("sessionTimeoutMins", {
              valueAsNumber: true,
            })}
          />

          <Input
            type="number"
            label="Maximum Concurrent Sessions"
            error={errors.maxConcurrentSessions?.message}
            {...register("maxConcurrentSessions", {
              valueAsNumber: true,
            })}
          />

          <Input
            type="number"
            label="Remember Me Duration (Days)"
            error={errors.rememberMeDays?.message}
            {...register("rememberMeDays", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="mt-8">
          <Controller
            control={control}
            name="enforceDeviceTrust"
            render={({ field }) => (
              <Switch
                label="Require Trusted Devices"
                description="Users must verify new devices before accessing the system."
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

export default SessionPolicyCard;
