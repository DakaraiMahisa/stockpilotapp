import type { UserStatus } from "../types/user-status";

interface UserStatusBadgeProps {
  status: UserStatus;
}

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  const styles: Record<
    UserStatus,
    {
      backgroundColor: string;
      color: string;
    }
  > = {
    ACTIVE: {
      backgroundColor: "var(--color-success-tint)",
      color: "var(--color-success)",
    },
    INVITED: {
      backgroundColor: "var(--color-warning-tint)",
      color: "var(--color-warning)",
    },
    DEACTIVATED: {
      backgroundColor: "var(--color-danger-tint)",
      color: "var(--color-danger)",
    },
  };

  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
      "
      style={styles[status]}
    >
      {status}
    </span>
  );
};

export default UserStatusBadge;
