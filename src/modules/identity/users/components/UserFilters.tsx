import { Input } from "@/components/ui";

const UserFilters = () => {
  return (
    <div
      className="flex flex-wrap items-end gap-4"
      style={{
        paddingBottom: "1rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div>
        <label
          className="mb-2 block text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Role
        </label>

        <select
          disabled
          className="rounded-lg border px-3 py-2"
          style={{
            borderColor: "var(--border)",
            minWidth: "160px",
          }}
        >
          <option>All Roles</option>
        </select>
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Status
        </label>

        <select
          disabled
          className="rounded-lg border px-3 py-2"
          style={{
            borderColor: "var(--border)",
            minWidth: "160px",
          }}
        >
          <option>All Status</option>
        </select>
      </div>

      <div className="w-80">
        <Input placeholder="Search users..." disabled />
      </div>
    </div>
  );
};

export default UserFilters;
