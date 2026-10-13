import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/modules/identity/auth/services/authService";
import { permissionsQueryKey } from "@/hooks/usePermissions";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,

    onSettled: async () => {
      queryClient.removeQueries({
        queryKey: permissionsQueryKey,
      });
    },
  });
};
