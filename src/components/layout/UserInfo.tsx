import { useCurrentUser } from "@/modules/identity/users/hooks/useCurrentUser";
import { formatRole } from "@/lib/utils/formatRole";

const UserInfo = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="hidden text-right lg:block">
        <p className="text-sm font-semibold text-foreground">Loading...</p>
        <p className="text-xs text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";

  return (
    <div className="hidden text-right lg:block">
      <p className="text-sm font-semibold text-foreground">{fullName}</p>

      <p className="text-xs text-muted-foreground">{formatRole(user?.role)}</p>
    </div>
  );
};

export default UserInfo;
