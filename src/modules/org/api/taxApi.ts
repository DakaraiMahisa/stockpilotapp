import apiClient from "@/lib/apiClient";

import type { ApiResponse } from "@/types/api";

import type {
  CreateTaxClassRequest,
  CreateTaxRateRequest,
  TaxBreakdownDto,
  TaxClassDto,
  TaxRateDto,
  UpdateTaxClassRequest,
} from "../types/tax.types";

const BASE_URL = "/api/v1/org/tax";

export const taxApi = {
  getTaxClasses: async (
    activeOnly?: boolean,
  ): Promise<ApiResponse<TaxClassDto[]>> => {
    const { data } = await apiClient.get<ApiResponse<TaxClassDto[]>>(
      `${BASE_URL}/classes`,
      {
        params: { activeOnly },
      },
    );

    return data;
  },

  getTaxClass: async (id: string): Promise<ApiResponse<TaxClassDto>> => {
    const { data } = await apiClient.get<ApiResponse<TaxClassDto>>(
      `${BASE_URL}/classes/${id}`,
    );

    return data;
  },

  createTaxClass: async (
    request: CreateTaxClassRequest,
  ): Promise<ApiResponse<TaxClassDto>> => {
    const { data } = await apiClient.post<ApiResponse<TaxClassDto>>(
      `${BASE_URL}/classes`,
      request,
    );

    return data;
  },

  updateTaxClass: async (
    id: string,
    request: UpdateTaxClassRequest,
  ): Promise<ApiResponse<TaxClassDto>> => {
    const { data } = await apiClient.put<ApiResponse<TaxClassDto>>(
      `${BASE_URL}/classes/${id}`,
      request,
    );

    return data;
  },

  setDefaultTaxClass: async (id: string): Promise<ApiResponse<TaxClassDto>> => {
    const { data } = await apiClient.patch<ApiResponse<TaxClassDto>>(
      `${BASE_URL}/classes/${id}/default`,
    );

    return data;
  },

  addTaxRate: async (
    taxClassId: string,
    request: CreateTaxRateRequest,
  ): Promise<ApiResponse<TaxRateDto>> => {
    const { data } = await apiClient.post<ApiResponse<TaxRateDto>>(
      `${BASE_URL}/classes/${taxClassId}/rates`,
      request,
    );

    return data;
  },

  resolveTax: async (
    taxClassId: string,
    amount: number,
    transactionDate: string,
  ): Promise<ApiResponse<TaxBreakdownDto>> => {
    const { data } = await apiClient.get<ApiResponse<TaxBreakdownDto>>(
      `${BASE_URL}/resolve`,
      {
        params: {
          taxClassId,
          amount,
          transactionDate,
        },
      },
    );

    return data;
  },
};
