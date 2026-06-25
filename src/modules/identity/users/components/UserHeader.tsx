import { Button } from "@/components/ui";

interface UserHeaderProps {
  totalUsers: number;
}

const UserHeader = ({ totalUsers }: UserHeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Users
        </h1>

        <p className="mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage users and their access.
        </p>

        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          {totalUsers} user{totalUsers !== 1 ? "s" : ""} found
        </p>
      </div>

      <Button disabled>Invite User</Button>
    </div>
  );
};

export default UserHeader;
