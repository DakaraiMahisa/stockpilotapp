import { useMutation } from "@tanstack/react-query";
import { authService } from "@/modules/identity/auth/services/authService";
import type { ResetPasswordRequest } from "../types/auth";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) =>
      authService.resetPassword(payload),
  });
};
