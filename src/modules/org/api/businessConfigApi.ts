import apiClient from "@/lib/apiClient";

import type { ApiResponse } from "@/types/api";

import type {
  BusinessConfigDto,
  BusinessConfigUpdateRequest,
} from "../types/businessConfig";

const BASE_URL = "/api/v1/org/config";

export const businessConfigApi = {
  getConfiguration: async (): Promise<ApiResponse<BusinessConfigDto>> => {
    const { data } =
      await apiClient.get<ApiResponse<BusinessConfigDto>>(BASE_URL);

    return data;
  },

  updateConfiguration: async (
    request: BusinessConfigUpdateRequest,
  ): Promise<ApiResponse<BusinessConfigDto>> => {
    const { data } = await apiClient.put<ApiResponse<BusinessConfigDto>>(
      BASE_URL,
      request,
    );

    return data;
  },
};
