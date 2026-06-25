import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@/utils/date";

import UserStatusBadge from "./UserStatusBadge";

import type { UserSummary } from "../types/user.types";
import { Button } from "@/components/ui";

interface UserTableProps {
  users: UserSummary[];
}
const UserTable = ({ users }: UserTableProps) => {
  const navigate = useNavigate();
  if (users.length === 0) {
    return <div className="py-10 text-center">No users found.</div>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>

            <TableCell>{user.email}</TableCell>

            <TableCell>{user.role}</TableCell>

            <TableCell>
              <UserStatusBadge status={user.status} />
            </TableCell>

            <TableCell>{formatDateTime(user.lastLoginAt)}</TableCell>
            <TableCell>
              <Button onClick={() => navigate(`/users/${user.id}`)}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
