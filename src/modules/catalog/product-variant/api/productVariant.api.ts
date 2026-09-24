import type { ApiResponse } from "@/types/api";
import apiClient from "@/lib/apiClient";

import type {
  ProductVariant,
  ProductVariantCreateRequest,
  ProductVariantUpdateRequest,
  VariantAttribute,
} from "../types/productVariant.types";

const BASE_URL = "/api/v1/catalog/products";

export const productVariantApi = {
  getVariantsByProductId: async (
    productId: string,
  ): Promise<ApiResponse<ProductVariant[]>> => {
    const { data } = await apiClient.get<ApiResponse<ProductVariant[]>>(
      `${BASE_URL}/${productId}/variants`,
    );

    return data;
  },

  getVariantById: async (
    productId: string,
    variantId: string,
  ): Promise<ApiResponse<ProductVariant>> => {
    const { data } = await apiClient.get<ApiResponse<ProductVariant>>(
      `${BASE_URL}/${productId}/variants/${variantId}`,
    );

    return data;
  },

  getVariantAttributes: async (
    productId: string,
  ): Promise<ApiResponse<VariantAttribute[]>> => {
    const { data } = await apiClient.get<ApiResponse<VariantAttribute[]>>(
      `${BASE_URL}/${productId}/variants/attributes`,
    );

    return data;
  },

  assignVariantAttribute: async (
    productId: string,
    attributeId: string,
  ): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.post<ApiResponse<void>>(
      `${BASE_URL}/${productId}/variants/attributes/${attributeId}`,
    );

    return data;
  },

  removeVariantAttribute: async (
    productId: string,
    attributeId: string,
  ): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete<ApiResponse<void>>(
      `${BASE_URL}/${productId}/variants/attributes/${attributeId}`,
    );

    return data;
  },

  createVariants: async (
    productId: string,
    requests: ProductVariantCreateRequest[],
  ): Promise<ApiResponse<ProductVariant[]>> => {
    const { data } = await apiClient.post<ApiResponse<ProductVariant[]>>(
      `${BASE_URL}/${productId}/variants`,
      requests,
    );

    return data;
  },

  updateVariant: async (
    productId: string,
    variantId: string,
    request: ProductVariantUpdateRequest,
  ): Promise<ApiResponse<ProductVariant>> => {
    const { data } = await apiClient.put<ApiResponse<ProductVariant>>(
      `${BASE_URL}/${productId}/variants/${variantId}`,
      request,
    );

    return data;
  },

  deactivateVariant: async (
    productId: string,
    variantId: string,
  ): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.patch<ApiResponse<void>>(
      `${BASE_URL}/${productId}/variants/${variantId}/deactivate`,
    );

    return data;
  },

  deleteVariant: async (
    productId: string,
    variantId: string,
  ): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete<ApiResponse<void>>(
      `${BASE_URL}/${productId}/variants/${variantId}`,
    );

    return data;
  },
};
