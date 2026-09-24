import type { ApiResponse } from "@/types/api";
import apiClient from "@/lib/apiClient";

import type {
  Product,
  ProductCreateRequest,
  ProductListParams,
  ProductPageResponse,
  ProductUpdateRequest,
} from "../types/product.types";

const BASE_URL = "/api/v1/catalog/products";

export const productApi = {
  getProducts: async (
    params?: ProductListParams,
  ): Promise<ApiResponse<ProductPageResponse>> => {
    const { data } = await apiClient.get<ApiResponse<ProductPageResponse>>(
      BASE_URL,
      { params },
    );
    return data;
  },

  getProductById: async (productId: string): Promise<ApiResponse<Product>> => {
    const { data } = await apiClient.get<ApiResponse<Product>>(
      `${BASE_URL}/${productId}`,
    );
    return data;
  },

  getProductBySku: async (sku: string): Promise<ApiResponse<Product>> => {
    const { data } = await apiClient.get<ApiResponse<Product>>(
      `${BASE_URL}/sku/${encodeURIComponent(sku)}`,
    );
    return data;
  },

  createProduct: async (
    request: ProductCreateRequest,
  ): Promise<ApiResponse<Product>> => {
    const { data } = await apiClient.post<ApiResponse<Product>>(
      BASE_URL,
      request,
    );
    return data;
  },

  updateProduct: async (
    productId: string,
    request: ProductUpdateRequest,
  ): Promise<ApiResponse<Product>> => {
    const { data } = await apiClient.put<ApiResponse<Product>>(
      `${BASE_URL}/${productId}`,
      request,
    );
    return data;
  },

  deactivateProduct: async (productId: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.patch<ApiResponse<void>>(
      `${BASE_URL}/${productId}`,
    );
    return data;
  },

  activateProduct: async (productId: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.patch<ApiResponse<void>>(
      `${BASE_URL}/${productId}/activate`,
    );
    return data;
  },
};
