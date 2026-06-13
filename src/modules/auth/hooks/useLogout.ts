import { useMutation } from "@tanstack/react-query";
import { authService } from "@/modules/auth/services/authService";

export const useLogout = () => {
  return useMutation({
    mutationFn: authService.logout,
  });
};
