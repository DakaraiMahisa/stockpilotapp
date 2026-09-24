import type { ApiResponse } from "@/types/api";
import apiClient from "@/lib/apiClient";
import type {
  PriceResolveRequest,
  PriceResolveResponse,
} from "../types/pricing.types";

const BASE_URL = "/api/v1/catalog/pricing";

export const pricingApi = {
  resolvePrice: async (
    request: PriceResolveRequest,
  ): Promise<ApiResponse<PriceResolveResponse>> => {
    const { data } = await apiClient.post<ApiResponse<PriceResolveResponse>>(
      `${BASE_URL}/resolve`,
      request,
    );

    return data;
  },
};
