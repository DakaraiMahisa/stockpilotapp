import { useState } from "react";

import { Button, Card } from "@/components/ui";

import { useRoles } from "@/modules/identity/roles/hooks/useRoles";

import { useChangeUserRole } from "../hooks/useChangeUserRole";

interface ChangeRoleModalProps {
  userId: string;
  currentRole: string;
  onClose: () => void;
}

const ChangeRoleModal = ({
  userId,
  currentRole,
  onClose,
}: ChangeRoleModalProps) => {
  const [selectedRoleId, setSelectedRoleId] = useState("");

  const { data: roles = [] } = useRoles();

  const mutation = useChangeUserRole();

  const handleSubmit = async () => {
    if (!selectedRoleId) {
      return;
    }

    await mutation.mutateAsync({
      userId,
      roleId: selectedRoleId,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-md">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Change Role</h2>

          <p>Current Role: {currentRole}</p>

          <select
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Select role</option>

            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="button"
              disabled={!selectedRoleId || mutation.isPending}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChangeRoleModal;
