import { useMutation } from "@tanstack/react-query";
import { registerOrganization } from "../api/authApi";
import type { RegisterOrganizationRequest } from "../types/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterOrganizationRequest) =>
      registerOrganization(payload),
  });
};
