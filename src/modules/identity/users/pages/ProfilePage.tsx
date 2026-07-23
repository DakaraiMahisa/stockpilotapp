import { useRef } from "react";
import { Card, Badge } from "@/components/ui";
import { EmptyState, Skeleton } from "@/components/feedback";
import { PageHeader } from "@/components/common";

import { useCurrentUser } from "../hooks/useCurrentUser";

import UserInfoRow from "../components/UserInfoRow";
import UserStatusBadge from "../components/UserStatusBadge";
import ChangePasswordCard, {
  type ChangePasswordCardRef,
} from "../../auth/components/ChangePasswordCard";
import { notifier } from "@/lib/notifications/notifier";
import type { ChangePasswordRequest } from "../../auth/types/auth";
import { useChangePassword } from "@/modules/identity/auth/hooks/useChangePassword";
const ProfilePage = () => {
  const changePasswordFormRef = useRef<ChangePasswordCardRef>(null);
  const { data, isLoading, isError } = useCurrentUser();
  const changePasswordMutation = useChangePassword();
  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (isError || !data) {
    return (
      <EmptyState
        title="Unable to load profile"
        description="Please refresh the page or try again later."
      />
    );
  }

  const handleChangePassword = (request: ChangePasswordRequest) => {
    changePasswordMutation.mutate(request, {
      onSuccess: () => {
        notifier.success("Password updated successfully.");

        changePasswordFormRef.current?.reset();
      },

      onError: (error) => {
        notifier.error(
          error instanceof Error ? error.message : "Failed to update password.",
        );
      },
    });
  };
  return (
    <div className="space-y-6">
      <PageHeader
        title={`${data.firstName} ${data.lastName}`}
        description={data.email}
      >
        <UserStatusBadge status={data.status} />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              User Information
            </h2>

            <UserInfoRow label="Role" value={data.role} />

            <UserInfoRow label="Status" value={data.status} />
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Security</h2>

            <UserInfoRow
              label="Email Verified"
              value={data.emailVerified ? "Yes" : "No"}
            />

            <UserInfoRow
              label="MFA Enabled"
              value={data.mfaEnabled ? "Yes" : "No"}
            />
          </div>
        </Card>
      </div>

      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Permissions</h2>

          <div className="flex flex-wrap gap-2">
            {data.permissions.map((permission: string) => (
              <Badge key={permission} variant="secondary">
                {permission}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Account Activity
          </h2>

          <UserInfoRow
            label="Created At"
            value={new Date(data.createdAt).toLocaleString()}
          />

          <UserInfoRow
            label="Last Login"
            value={
              data.lastLoginAt
                ? new Date(data.lastLoginAt).toLocaleString()
                : "Never"
            }
          />
        </div>
      </Card>

      <ChangePasswordCard
        ref={changePasswordFormRef}
        loading={changePasswordMutation.isPending}
        onSave={handleChangePassword}
      />
    </div>
  );
};

export default ProfilePage;
