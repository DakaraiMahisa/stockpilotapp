export interface RegisterOrganizationRequest {
  organizationName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  timezone?: string;
  currencyCode?: string;
}

export type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T | null;
  errors: string[] | null;
  timestamp: string;
};
export type VoidResponse = ApiResponse<null>;

export interface LoginRequest {
  tenantCode: string;
  email: string;
  password: string;
  deviceInfo?: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = ApiResponse<TokenResponse>;

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}
