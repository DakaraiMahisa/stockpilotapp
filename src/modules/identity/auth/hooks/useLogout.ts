import { useMutation } from "@tanstack/react-query";
import { authService } from "@/modules/identity/auth/services/authService";

export const useLogout = () => {
  return useMutation({
    mutationFn: authService.logout,
  });
};
