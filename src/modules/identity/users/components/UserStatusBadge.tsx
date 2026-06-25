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
      backgroundColor: "rgba(5, 150, 105, 0.12)",
      color: "var(--success)",
    },
    INVITED: {
      backgroundColor: "rgba(217, 119, 6, 0.12)",
      color: "var(--warning)",
    },
    DEACTIVATED: {
      backgroundColor: "rgba(220, 38, 38, 0.12)",
      color: "var(--danger)",
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
