import { useAuthStore } from "@/store/authStore";

export const usePermissions = () => {
  const permissions = useAuthStore((state) => state.permissions);

  const hasPermission = (permission: string) =>
    permissions.includes(permission);

  return {
    permissions,
    hasPermission,
  };
};
