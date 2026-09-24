import type { ApiResponse } from "@/types/api";
import type { PageResponse } from "@/types/pagination";
import apiClient from "@/lib/apiClient";
import type {
  CreatePriceListRequest,
  PriceList,
  PriceListItem,
  PriceListItemRequest,
  UpdatePriceListRequest,
} from "../types/priceList.types";

const BASE_URL = "/api/v1/catalog/price-lists";

export const priceListApi = {
  create: async (
    request: CreatePriceListRequest,
  ): Promise<ApiResponse<PriceList>> => {
    const { data } = await apiClient.post<ApiResponse<PriceList>>(
      BASE_URL,
      request,
    );

    return data;
  },

  getAll: async (
    page = 0,
    size = 20,
    sort = "name,asc",
  ): Promise<ApiResponse<PageResponse<PriceList>>> => {
    const { data } = await apiClient.get<ApiResponse<PageResponse<PriceList>>>(
      BASE_URL,
      {
        params: {
          page,
          size,
          sort,
        },
      },
    );

    return data;
  },

  getById: async (priceListId: string): Promise<ApiResponse<PriceList>> => {
    const { data } = await apiClient.get<ApiResponse<PriceList>>(
      `${BASE_URL}/${priceListId}`,
    );

    return data;
  },

  update: async (
    priceListId: string,
    request: UpdatePriceListRequest,
  ): Promise<ApiResponse<PriceList>> => {
    const { data } = await apiClient.put<ApiResponse<PriceList>>(
      `${BASE_URL}/${priceListId}`,
      request,
    );

    return data;
  },

  remove: async (priceListId: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete<ApiResponse<void>>(
      `${BASE_URL}/${priceListId}`,
    );

    return data;
  },

  getItems: async (
    priceListId: string,
  ): Promise<ApiResponse<PriceListItem[]>> => {
    const { data } = await apiClient.get<ApiResponse<PriceListItem[]>>(
      `${BASE_URL}/${priceListId}/items`,
    );

    return data;
  },

  upsertItems: async (
    priceListId: string,
    requests: PriceListItemRequest[],
  ): Promise<ApiResponse<PriceListItem[]>> => {
    const { data } = await apiClient.put<ApiResponse<PriceListItem[]>>(
      `${BASE_URL}/${priceListId}/items`,
      requests,
    );

    return data;
  },

  deleteItem: async (
    priceListId: string,
    itemId: string,
  ): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete<ApiResponse<void>>(
      `${BASE_URL}/${priceListId}/items/${itemId}`,
    );

    return data;
  },
};
