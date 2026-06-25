import { useMutation } from "@tanstack/react-query";

import { authService } from "../services/authService";

export const useAcceptInvitation = () => {
  return useMutation({
    mutationFn: authService.acceptInvitation,
  });
};
