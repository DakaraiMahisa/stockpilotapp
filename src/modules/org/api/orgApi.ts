import apiClient from "@/lib/apiClient";

import type {
  LogoConfirmRequest,
  LogoPresignedRequest,
  Organization,
  PresignedUploadResponse,
  UpdateOrganizationRequest,
} from "../types/org.types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export const orgApi = {
  async getProfile(): Promise<Organization> {
    const response = await apiClient.get<ApiResponse<Organization>>(
      "/api/v1/org/profile",
    );

    return response.data.data;
  },

  async updateProfile(
    request: UpdateOrganizationRequest,
  ): Promise<Organization> {
    const response = await apiClient.put<ApiResponse<Organization>>(
      "/api/v1/org/profile",
      request,
    );

    return response.data.data;
  },

  async generateLogoUploadUrl(
    request: LogoPresignedRequest,
  ): Promise<PresignedUploadResponse> {
    const response = await apiClient.post<ApiResponse<PresignedUploadResponse>>(
      "/api/v1/org/logo/presigned-url",
      request,
    );

    return response.data.data;
  },

  async confirmLogoUpload(request: LogoConfirmRequest): Promise<Organization> {
    const response = await apiClient.post<ApiResponse<Organization>>(
      "/api/v1/org/logo/confirm",
      request,
    );

    return response.data.data;
  },
};
