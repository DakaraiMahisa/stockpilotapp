import { useState } from "react";

import { Button, Card, Input } from "@/components/ui";

import { useRoles } from "@/modules/identity/roles/hooks/useRoles";

import { useInviteUser } from "../hooks/useInviteUser";

interface InviteUserModalProps {
  onClose: () => void;
}

const InviteUserModal = ({ onClose }: InviteUserModalProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleId, setRoleId] = useState("");

  const { data: roles = [] } = useRoles();

  const mutation = useInviteUser();

  const handleSubmit = async () => {
    await mutation.mutateAsync({
      email,
      firstName,
      lastName,
      roleId,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-lg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Invite User</h2>

          <Input
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Input
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Role</label>

            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                px-3
                py-2
              "
            >
              <option value="">Select Role</option>

              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="button"
              disabled={
                !email ||
                !firstName ||
                !lastName ||
                !roleId ||
                mutation.isPending
              }
              onClick={handleSubmit}
            >
              Invite
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InviteUserModal;
