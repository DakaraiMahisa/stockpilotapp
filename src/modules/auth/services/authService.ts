import { registerOrganization, login } from "@/modules/auth/api/authApi";

import type {
  RegisterOrganizationRequest,
  LoginRequest,
} from "@/modules/auth/types/auth";

export const authService = {
  registerOrganization: async (payload: RegisterOrganizationRequest) => {
    const response = await registerOrganization(payload);

    if (!response.success) {
      throw new Error(response.message ?? "Registration failed");
    }

    return response;
  },

  login: async (payload: LoginRequest) => {
    const response = await login(payload);

    if (!response.success) {
      throw new Error(response.message ?? "Login failed");
    }

    return response;
  },
};
