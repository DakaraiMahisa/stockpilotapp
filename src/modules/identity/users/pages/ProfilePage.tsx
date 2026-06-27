import { Card } from "@/components/ui";

import { useCurrentUser } from "../hooks/useCurrentUser";

import UserInfoRow from "../components/UserInfoRow";
import UserStatusBadge from "../components/UserStatusBadge";

const ProfilePage = () => {
  const { data, isLoading, error } = useCurrentUser();

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error || !data) {
    return <div>{error?.message}</div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {data.firstName} {data.lastName}
          </h1>

          <p>{data.email}</p>
        </div>

        <UserStatusBadge status={data.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">User Information</h2>

            <UserInfoRow label="Role" value={data.role} />
            <UserInfoRow label="Status" value={data.status} />
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Security</h2>

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
          <h2 className="text-xl font-semibold">Permissions</h2>

          <div className="flex flex-wrap gap-2">
            {data.permissions.map((permission: string) => (
              <span
                key={permission}
                className="rounded-md border px-3 py-1 text-sm"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Audit Information</h2>

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
    </div>
  );
};

export default ProfilePage;
