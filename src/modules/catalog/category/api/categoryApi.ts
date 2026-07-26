import apiClient from "@/lib/apiClient";

import type { ApiResponse } from "@/types/api";

import type {
  CategoryDto,
  CategoryTreeDto,
  CreateCategoryRequest,
  MoveCategoryRequest,
  UpdateCategoryRequest,
} from "../types/category.types";

const BASE_URL = "/api/v1/catalog/categories";

export const categoryApi = {
  getCategoryById: async (
    categoryId: string,
  ): Promise<ApiResponse<CategoryDto>> => {
    const { data } = await apiClient.get<ApiResponse<CategoryDto>>(
      `${BASE_URL}/${categoryId}`,
    );

    return data;
  },

  getCategoryTree: async (): Promise<ApiResponse<CategoryTreeDto[]>> => {
    const { data } = await apiClient.get<ApiResponse<CategoryTreeDto[]>>(
      `${BASE_URL}/tree`,
    );

    return data;
  },

  createCategory: async (
    request: CreateCategoryRequest,
  ): Promise<ApiResponse<CategoryDto>> => {
    const { data } = await apiClient.post<ApiResponse<CategoryDto>>(
      BASE_URL,
      request,
    );

    return data;
  },

  updateCategory: async (
    categoryId: string,
    request: UpdateCategoryRequest,
  ): Promise<ApiResponse<CategoryDto>> => {
    const { data } = await apiClient.put<ApiResponse<CategoryDto>>(
      `${BASE_URL}/${categoryId}`,
      request,
    );

    return data;
  },

  moveCategory: async (
    categoryId: string,
    request: MoveCategoryRequest,
  ): Promise<ApiResponse<CategoryDto>> => {
    const { data } = await apiClient.patch<ApiResponse<CategoryDto>>(
      `${BASE_URL}/${categoryId}/move`,
      request,
    );

    return data;
  },

  deleteCategory: async (categoryId: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete<ApiResponse<void>>(
      `${BASE_URL}/${categoryId}`,
    );

    return data;
  },
};
