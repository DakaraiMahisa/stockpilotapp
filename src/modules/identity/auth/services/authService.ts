import { useAuthStore } from "@/store/authStore";
import { initializeCsrf } from "@/lib/initializeCsrf";
import {
  registerOrganization,
  login,
  forgotPassword,
  resetPassword,
  logout,
  changePassword,
} from "@/modules/identity/auth/api/authApi";

import type {
  RegisterOrganizationRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AcceptInvitationRequest,
  ChangePasswordRequest,
} from "@/modules/identity/auth/types/auth";

import { acceptInvitation } from "../api/authApi";

const clearTokens = useAuthStore.getState().clearTokens;
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

  forgotPassword: async (payload: ForgotPasswordRequest) => {
    const response = await forgotPassword(payload);

    if (!response.success) {
      throw new Error(response.message ?? "Failed to send reset email");
    }

    return response;
  },

  resetPassword: async (payload: ResetPasswordRequest) => {
    const response = await resetPassword(payload);

    if (!response.success) {
      throw new Error(response.message ?? "Failed to reset password");
    }

    return response;
  },

  logout: async () => {
    const response = await logout();
    if (!response.success) {
      throw new Error(response.message ?? "Logout failed");
    }
    clearTokens();

    await initializeCsrf();
    console.log(document.cookie);
    return response;
  },

  acceptInvitation: async (payload: AcceptInvitationRequest) => {
    await acceptInvitation(payload);
  },

  changePassword: async (payload: ChangePasswordRequest) => {
    await changePassword(payload);
  },
};
