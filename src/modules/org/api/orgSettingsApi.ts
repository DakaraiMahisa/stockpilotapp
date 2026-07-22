import apiClient from "@/lib/apiClient";

import type { ApiResponse } from "@/types/api";

import type {
  OrgSettingsDto,
  UpdateGeneralSettingsRequest,
  UpdateInvitePolicyRequest,
  UpdatePasswordPolicyRequest,
  UpdateSessionPolicyRequest,
} from "../types/orgSettings.types";

const BASE_URL = "/api/v1/org/org-settings";

export const orgSettingsApi = {
  getSettings: async (): Promise<ApiResponse<OrgSettingsDto>> => {
    const { data } = await apiClient.get<ApiResponse<OrgSettingsDto>>(BASE_URL);

    return data;
  },

  updatePasswordPolicy: async (
    request: UpdatePasswordPolicyRequest,
  ): Promise<ApiResponse<OrgSettingsDto>> => {
    const { data } = await apiClient.put<ApiResponse<OrgSettingsDto>>(
      `${BASE_URL}/password-policy`,
      request,
    );

    return data;
  },

  updateSessionPolicy: async (
    request: UpdateSessionPolicyRequest,
  ): Promise<ApiResponse<OrgSettingsDto>> => {
    const { data } = await apiClient.put<ApiResponse<OrgSettingsDto>>(
      `${BASE_URL}/session-policy`,
      request,
    );

    return data;
  },

  updateInvitePolicy: async (
    request: UpdateInvitePolicyRequest,
  ): Promise<ApiResponse<OrgSettingsDto>> => {
    const { data } = await apiClient.put<ApiResponse<OrgSettingsDto>>(
      `${BASE_URL}/invite-policy`,
      request,
    );

    return data;
  },

  updateGeneralSettings: async (
    request: UpdateGeneralSettingsRequest,
  ): Promise<ApiResponse<OrgSettingsDto>> => {
    const { data } = await apiClient.put<ApiResponse<OrgSettingsDto>>(
      `${BASE_URL}/general`,
      request,
    );

    return data;
  },
};
