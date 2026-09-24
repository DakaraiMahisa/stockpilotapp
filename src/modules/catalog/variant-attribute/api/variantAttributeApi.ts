import type { ApiResponse } from "@/types/api";
import apiClient from "@/lib/apiClient";

import type {
  CreateVariantAttributeRequest,
  CreateVariantAttributeValueRequest,
  UpdateVariantAttributeRequest,
  UpdateVariantAttributeValueRequest,
  VariantAttribute,
  VariantAttributeValue,
} from "../types/variantAttribute";

const BASE_PATH = "/api/v1/catalog/variant-attributes";

export const variantAttributeApi = {
  getAll: async (): Promise<ApiResponse<VariantAttribute[]>> => {
    const response =
      await apiClient.get<ApiResponse<VariantAttribute[]>>(BASE_PATH);

    return response.data;
  },

  getById: async (
    attributeId: string,
  ): Promise<ApiResponse<VariantAttribute>> => {
    const response = await apiClient.get<ApiResponse<VariantAttribute>>(
      `${BASE_PATH}/${attributeId}`,
    );

    return response.data;
  },

  create: async (
    request: CreateVariantAttributeRequest,
  ): Promise<ApiResponse<VariantAttribute>> => {
    const response = await apiClient.post<ApiResponse<VariantAttribute>>(
      BASE_PATH,
      request,
    );

    return response.data;
  },

  update: async (
    attributeId: string,
    request: UpdateVariantAttributeRequest,
  ): Promise<ApiResponse<VariantAttribute>> => {
    const response = await apiClient.put<ApiResponse<VariantAttribute>>(
      `${BASE_PATH}/${attributeId}`,
      request,
    );

    return response.data;
  },

  activate: async (attributeId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.patch<ApiResponse<void>>(
      `${BASE_PATH}/${attributeId}/activate`,
    );

    return response.data;
  },

  deactivate: async (attributeId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.patch<ApiResponse<void>>(
      `${BASE_PATH}/${attributeId}/deactivate`,
    );

    return response.data;
  },

  remove: async (attributeId: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(
      `${BASE_PATH}/${attributeId}`,
    );

    return response.data;
  },

  createValue: async (
    attributeId: string,
    request: CreateVariantAttributeValueRequest,
  ): Promise<ApiResponse<VariantAttributeValue>> => {
    const response = await apiClient.post<ApiResponse<VariantAttributeValue>>(
      `${BASE_PATH}/${attributeId}/values`,
      request,
    );

    return response.data;
  },

  getValues: async (
    attributeId: string,
  ): Promise<ApiResponse<VariantAttributeValue[]>> => {
    const response = await apiClient.get<ApiResponse<VariantAttributeValue[]>>(
      `${BASE_PATH}/${attributeId}/values`,
    );

    return response.data;
  },

  getValueById: async (
    attributeId: string,
    valueId: string,
  ): Promise<ApiResponse<VariantAttributeValue>> => {
    const response = await apiClient.get<ApiResponse<VariantAttributeValue>>(
      `${BASE_PATH}/${attributeId}/values/${valueId}`,
    );

    return response.data;
  },

  updateValue: async (
    attributeId: string,
    valueId: string,
    request: UpdateVariantAttributeValueRequest,
  ): Promise<ApiResponse<VariantAttributeValue>> => {
    const response = await apiClient.put<ApiResponse<VariantAttributeValue>>(
      `${BASE_PATH}/${attributeId}/values/${valueId}`,
      request,
    );

    return response.data;
  },

  activateValue: async (
    attributeId: string,
    valueId: string,
  ): Promise<ApiResponse<void>> => {
    const response = await apiClient.patch<ApiResponse<void>>(
      `${BASE_PATH}/${attributeId}/values/${valueId}/activate`,
    );

    return response.data;
  },

  deactivateValue: async (
    attributeId: string,
    valueId: string,
  ): Promise<ApiResponse<void>> => {
    const response = await apiClient.patch<ApiResponse<void>>(
      `${BASE_PATH}/${attributeId}/values/${valueId}/deactivate`,
    );

    return response.data;
  },

  removeValue: async (
    attributeId: string,
    valueId: string,
  ): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(
      `${BASE_PATH}/${attributeId}/values/${valueId}`,
    );

    return response.data;
  },
};
