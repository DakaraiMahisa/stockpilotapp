import { useMutation } from "@tanstack/react-query";

import { authService } from "../services/authService";

export const useChangePassword = () =>
  useMutation({
    mutationFn: authService.changePassword,
  });
