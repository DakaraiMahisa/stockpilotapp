import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { Card, Button } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
import { useUser } from "../hooks/useUser";
import { PageHeader } from "@/components/common";
import UserStatusBadge from "../components/UserStatusBadge";
import ChangeRoleModal from "../components/ChangeRoleModal";
import UserSessionsCard from "../components/UserSessionsCard";
import UserInfoRow from "../components/UserInfoRow";
import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";
import { useActivateUser } from "../hooks/useActivateUser";
import { useDeactivateUser } from "../hooks/useDeactivateUser";

const UserDetailsPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { hasPermission } = usePermissions();
  const currentUserId = useAuthStore((state) => state.userId);

  const backPath = hasPermission(PERMISSIONS.USERS_READ)
    ? "/users"
    : "/profile";

  const [showRoleModal, setShowRoleModal] = useState(false);
  const { mutate: activate, isPending: activating } = useActivateUser();

  const { mutate: deactivate, isPending: deactivating } = useDeactivateUser();

  const { data, isLoading, error } = useUser(id ?? "");

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  if (error || !data) {
    return <div>{error?.message}</div>;
  }

  const canChangeRole =
    hasPermission(PERMISSIONS.USERS_UPDATE) && currentUserId !== data.id;

  const canManageSessions =
    hasPermission(PERMISSIONS.SESSIONS_READ) &&
    hasPermission(PERMISSIONS.SESSIONS_REVOKE);

  const canActivateUser = hasPermission(PERMISSIONS.USERS_ACTIVATE);

  const canDeactivateUser = hasPermission(PERMISSIONS.USERS_DEACTIVATE);

  const isOwnProfile = currentUserId === data.id;
  return (
    <div className="space-y-6">
      <button onClick={() => navigate(backPath)} className="text-sm text-brand">
        {hasPermission(PERMISSIONS.USERS_READ)
          ? "← Back to Users"
          : "← My Profile"}
      </button>
      <PageHeader
        title={`${data.firstName} ${data.lastName}`}
        description={data.email}
      >
        <div className="flex items-center gap-3">
          {!isOwnProfile && canActivateUser && data.active === false && (
            <Button disabled={activating} onClick={() => activate(data.id)}>
              Activate
            </Button>
          )}

          {!isOwnProfile && canDeactivateUser && data.active === true && (
            <Button
              variant="danger"
              disabled={deactivating}
              onClick={() => deactivate(data.id)}
            >
              Deactivate
            </Button>
          )}
          {canChangeRole && (
            <Button onClick={() => setShowRoleModal(true)}>Change Role</Button>
          )}

          <UserStatusBadge status={data.status} />
        </div>
      </PageHeader>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="space-y-4">
            <h2
              className="text-xl font-semibold text-text-primary"
              style={{
                color: "var(--text-primary)",
              }}
            >
              User Information
            </h2>

            <UserInfoRow label="Role" value={data.role} />

            <UserInfoRow label="Status" value={data.status} />
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <h2
              className="text-xl font-semibold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              Security
            </h2>

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
          <h2
            className="text-xl font-semibold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Permissions
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.permissions.map((permission) => (
              <span
                key={permission}
                className="rounded-md border border-border bg-surface-raised px-3 py-1.5 text-sm font-medium text-text-primary"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>
      </Card>
      <Card>
        <div className="space-y-4">
          <h2
            className="text-xl font-semibold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Audit Information
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
      {canManageSessions && <UserSessionsCard userId={data.id} />}
      {canChangeRole && showRoleModal && (
        <ChangeRoleModal
          userId={data.id}
          currentRole={data.role}
          onClose={() => setShowRoleModal(false)}
        />
      )}
    </div>
  );
};

export default UserDetailsPage;
