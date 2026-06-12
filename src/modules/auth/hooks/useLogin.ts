import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { useAuthStore } from "@/store/authStore";
import type { LoginRequest } from "../types/auth";

const auth = useAuthStore.getState();

console.log(auth);

export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: (payload: LoginRequest) => authService.login(payload),

    onSuccess: (response) => {
      const tokens = response.data;

      if (!tokens) return;

      setTokens(tokens.accessToken, tokens.refreshToken);
    },
  });
};
