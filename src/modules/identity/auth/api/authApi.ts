import apiClient from "@/lib/apiClient";
import type {
  RegisterOrganizationRequest,
  VoidResponse,
} from "@/modules/identity/auth/types/auth";

import type {
  LoginRequest,
  LoginResponse,
  ChangePasswordRequest,
} from "../types/auth";
import type {
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AcceptInvitationRequest,
} from "../types/auth";

export const registerOrganization = async (
  payload: RegisterOrganizationRequest,
): Promise<VoidResponse> => {
  const response = await apiClient.post<VoidResponse>(
    "/api/v1/auth/register/public",
    payload,
  );

  return response.data;
};

export const verifyEmail = async (token: string): Promise<VoidResponse> => {
  const response = await apiClient.get("/api/v1/auth/verify-email/public", {
    params: { token },
  });

  return response.data;
};

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post("/api/v1/auth/login/public", payload);

  return response.data;
};

export const forgotPassword = async (
  payload: ForgotPasswordRequest,
): Promise<VoidResponse> => {
  const response = await apiClient.post(
    "/api/v1/auth/forgot-password/public",
    payload,
  );

  return response.data;
};

export const resetPassword = async (
  payload: ResetPasswordRequest,
): Promise<VoidResponse> => {
  const response = await apiClient.post(
    "/api/v1/auth/reset-password/public",
    payload,
  );

  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/api/v1/auth/logout/public");

  return response.data;
};

export const acceptInvitation = async (
  payload: AcceptInvitationRequest,
): Promise<void> => {
  await apiClient.post("/api/v1/auth/accept-invitation", payload);
};

export const changePassword = async (
  payload: ChangePasswordRequest,
): Promise<void> => {
  await apiClient.put("/api/v1/auth/change-password/public", payload);
};
