import { usePermissions } from "./usePermissions";

export const useAuthorization = () => {
  const { hasPermission } = usePermissions();

  return {
    canReadUsers: hasPermission("users:read"),

    canInviteUsers: hasPermission("users:invite"),

    canUpdateUsers: hasPermission("users:update"),

    canActivateUsers: hasPermission("users:activate"),

    canDeactivateUsers: hasPermission("users:deactivate"),

    canReadSessions: hasPermission("sessions:read"),

    canRevokeSessions: hasPermission("sessions:revoke"),
  };
};
