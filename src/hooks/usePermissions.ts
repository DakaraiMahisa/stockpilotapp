import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { fetchCurrentUserPermissions } from "@/modules/identity/users/services/permissionService";

export const permissionsQueryKey = ["current-user", "permissions"] as const;

export const usePermissions = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const query = useQuery({
    queryKey: permissionsQueryKey,
    queryFn: fetchCurrentUserPermissions,
    enabled: isAuthenticated,
    staleTime: 60_000,
    retry: 1,
  });

  const hasPermission = (permission: string): boolean =>
    query.data?.includes(permission) ?? false;

  return {
    permissions: query.data ?? [],
    hasPermission,
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
};
