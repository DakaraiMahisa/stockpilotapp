import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { Card, Button } from "@/components/ui";

import { useUser } from "../hooks/useUser";
import UserStatusBadge from "../components/UserStatusBadge";
import ChangeRoleModal from "../components/ChangeRoleModal";
import UserInfoRow from "../components/UserInfoRow";

const UserDetailsPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [showRoleModal, setShowRoleModal] = useState(false);

  const { data, isLoading, error } = useUser(id ?? "");

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  if (error || !data) {
    return <div>Error loading user</div>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/users")}
        className="text-sm"
        style={{
          color: "var(--brand)",
        }}
      >
        ← Back to Users
      </button>
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {data.firstName} {data.lastName}
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {data.email}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setShowRoleModal(true)}>Change Role</Button>

          <UserStatusBadge status={data.status} />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="space-y-4">
            <h2
              className="text-xl font-semibold"
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
                className="rounded-md px-3 py-1.5text-sm font-medium"
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)",
                }}
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
      {showRoleModal && (
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
