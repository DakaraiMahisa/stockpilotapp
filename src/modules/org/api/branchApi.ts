import apiClient from "@/lib/apiClient";

import type { ApiResponse } from "@/types/api";
import type { PageResponse } from "@/types/pagination";

import type {
  BranchDto,
  BranchQueryParams,
  CreateBranchRequest,
  UpdateBranchRequest,
  UpdateBranchStatusRequest,
  DefaultBranchResponse,
} from "../types/org.types";

const BASE_URL = "/api/v1/org/branches";

export const branchApi = {
  getBranches: async (
    params: BranchQueryParams,
  ): Promise<ApiResponse<PageResponse<BranchDto>>> => {
    const { data } = await apiClient.get<ApiResponse<PageResponse<BranchDto>>>(
      BASE_URL,
      {
        params,
      },
    );

    return data;
  },
  getBranch: async (branchId: string): Promise<ApiResponse<BranchDto>> => {
    const { data } = await apiClient.get<ApiResponse<BranchDto>>(
      `${BASE_URL}/${branchId}`,
    );

    return data;
  },

  createBranch: async (
    request: CreateBranchRequest,
  ): Promise<ApiResponse<BranchDto>> => {
    const { data } = await apiClient.post<ApiResponse<BranchDto>>(
      BASE_URL,
      request,
    );

    return data;
  },

  updateBranch: async (
    branchId: string,
    request: UpdateBranchRequest,
  ): Promise<ApiResponse<BranchDto>> => {
    const { data } = await apiClient.put<ApiResponse<BranchDto>>(
      `${BASE_URL}/${branchId}`,
      request,
    );

    return data;
  },

  updateBranchStatus: async (
    branchId: string,
    request: UpdateBranchStatusRequest,
  ): Promise<ApiResponse<BranchDto>> => {
    const { data } = await apiClient.patch<ApiResponse<BranchDto>>(
      `${BASE_URL}/${branchId}/status`,
      request,
    );

    return data;
  },

  setDefaultBranch: async (
    branchId: string,
  ): Promise<ApiResponse<DefaultBranchResponse>> => {
    const { data } = await apiClient.patch<ApiResponse<DefaultBranchResponse>>(
      `${BASE_URL}/${branchId}/default`,
    );

    return data;
  },
};
