import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";
import type {
  Brand,
  BrandSummary,
  BrandCreateRequest,
  BrandUpdateRequest,
  BrandListParams,
  BrandPageResponse,
} from "../types/brand.types";

const BASE_URL = "/api/v1/catalog/brands";

export const brandApi = {
  getBrandById: async (brandId: string): Promise<ApiResponse<Brand>> => {
    const { data } = await apiClient.get<ApiResponse<Brand>>(
      `${BASE_URL}/${brandId}`,
    );

    return data;
  },

  getBrands: async (
    params?: BrandListParams,
  ): Promise<ApiResponse<BrandPageResponse>> => {
    const { data } = await apiClient.get<ApiResponse<BrandPageResponse>>(
      BASE_URL,
      { params },
    );

    return data;
  },

  getActiveBrands: async (): Promise<ApiResponse<BrandSummary[]>> => {
    const { data } = await apiClient.get<ApiResponse<BrandSummary[]>>(
      `${BASE_URL}/active`,
    );

    return data;
  },

  createBrand: async (
    request: BrandCreateRequest,
  ): Promise<ApiResponse<Brand>> => {
    const { data } = await apiClient.post<ApiResponse<Brand>>(
      BASE_URL,
      request,
    );

    return data;
  },

  updateBrand: async (
    brandId: string,
    request: BrandUpdateRequest,
  ): Promise<ApiResponse<Brand>> => {
    const { data } = await apiClient.put<ApiResponse<Brand>>(
      `${BASE_URL}/${brandId}`,
      request,
    );

    return data;
  },

  activateBrand: async (brandId: string): Promise<ApiResponse<Brand>> => {
    const { data } = await apiClient.patch<ApiResponse<Brand>>(
      `${BASE_URL}/${brandId}/activate`,
    );

    return data;
  },

  deleteBrand: async (brandId: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete<ApiResponse<void>>(
      `${BASE_URL}/${brandId}`,
    );

    return data;
  },
};
