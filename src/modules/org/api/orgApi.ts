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

  getLogo: async (): Promise<Blob> => {
    const response = await apiClient.get("/api/v1/org/logo", {
      responseType: "blob",
    });

    return response.data;
  },

  async updateProfile(
    request: UpdateOrganizationRequest,
  ): Promise<Organization> {
    const response = await apiClient.patch<ApiResponse<Organization>>(
      "/api/v1/org/profile",
      request,
    );

    return response.data.data;
  },

  async generateLogoUploadUrl(
    request: LogoPresignedRequest,
  ): Promise<PresignedUploadResponse> {
    const response = await apiClient.post<ApiResponse<PresignedUploadResponse>>(
      "/api/v1/org/logo/presigned",
      request,
    );

    return response.data.data;
  },

  async confirmLogoUpload(request: LogoConfirmRequest): Promise<Organization> {
    const response = await apiClient.patch<ApiResponse<Organization>>(
      "/api/v1/org/logo/confirm",
      request,
    );

    return response.data.data;
  },
};
