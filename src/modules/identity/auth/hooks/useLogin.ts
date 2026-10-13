import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { useAuthStore } from "@/store/authStore";
import type { LoginRequest } from "../types/auth";
import { permissionsQueryKey } from "@/hooks/usePermissions";

export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const response = await authService.login(payload);
      const tokens = response.data;

      if (!response.success || !tokens) {
        throw new Error(response.message || "Login failed.");
      }

      return tokens;
    },

    onSuccess: (tokens) => {
      setTokens(tokens.accessToken, tokens.refreshToken);

      // Prevent permissions from a previous session being reused.
      queryClient.removeQueries({
        queryKey: permissionsQueryKey,
      });
    },
  });
};
