import { usePermissions } from "./usePermissions";

export const useAuthorization = () => {
  const { hasPermission } = usePermissions();

  return {
    canReadOrganization: hasPermission("organization:read"),

    canUpdateOrganization: hasPermission("organization:update"),

    canReadUsers: hasPermission("users:read"),

    canInviteUsers: hasPermission("users:invite"),

    canUpdateUsers: hasPermission("users:update"),

    canActivateUsers: hasPermission("users:activate"),

    canDeactivateUsers: hasPermission("users:deactivate"),

    canReadSessions: hasPermission("sessions:read"),

    canRevokeSessions: hasPermission("sessions:revoke"),
  };
};
