import { useState } from "react";
import UserTable from "../components/UserTable";
import UserHeader from "../components/UserHeader";
import UserFilters from "../components/UserFilters";
import InviteUserModal from "../components/InviteUserModal";
import { Card } from "@/components/ui";
import { useUsers } from "../hooks/useUsers";
import { Navigate } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";
const UsersPage = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const { data, isLoading, error } = useUsers({
    page: 0,
    size: 20,
  });
  const { hasPermission } = usePermissions();
  if (!hasPermission(PERMISSIONS.USERS_READ)) {
    return <Navigate to="/dashboard" replace />;
  }
  if (isLoading) {
    return <div className="text-text-secondary">Loading...</div>;
  }

  if (error || !data) {
    return <div className="text-danger">{error?.message}</div>;
  }

  return (
    <div className="space-y-6">
      <UserHeader
        totalUsers={data?.totalElements ?? 0}
        onInvite={() => setInviteOpen(true)}
      />

      <Card>
        <UserFilters />
        <div className="mt-6">
          <UserTable users={data?.content ?? []} />
        </div>
      </Card>

      {inviteOpen && <InviteUserModal onClose={() => setInviteOpen(false)} />}
    </div>
  );
};

export default UsersPage;
