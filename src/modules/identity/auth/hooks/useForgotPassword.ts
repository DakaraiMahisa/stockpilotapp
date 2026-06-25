import { useMutation } from "@tanstack/react-query";
import { authService } from "@/modules/identity/auth/services/authService";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
};
