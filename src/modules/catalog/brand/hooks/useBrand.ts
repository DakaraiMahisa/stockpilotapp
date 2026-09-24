import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { brandApi } from "../api/brand.api";
import { brandKeys } from "../api/brand.keys";

import type {
  BrandCreateRequest,
  BrandListParams,
  BrandUpdateRequest,
} from "../types/brand.types";

export const useBrand = (brandId: string) =>
  useQuery({
    queryKey: brandKeys.detail(brandId),
    queryFn: () => brandApi.getBrandById(brandId),
    enabled: Boolean(brandId),
    staleTime: 5 * 60 * 1000,
  });

export const useBrands = (params: BrandListParams = {}) =>
  useQuery({
    queryKey: brandKeys.list(params),
    queryFn: () => brandApi.getBrands(params),
    staleTime: 5 * 60 * 1000,
  });

export const useActiveBrands = () =>
  useQuery({
    queryKey: brandKeys.active(),
    queryFn: brandApi.getActiveBrands,
    staleTime: 5 * 60 * 1000,
  });

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: BrandCreateRequest) => brandApi.createBrand(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: brandKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: brandKeys.active(),
      });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      brandId,
      request,
    }: {
      brandId: string;
      request: BrandUpdateRequest;
    }) => brandApi.updateBrand(brandId, request),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: brandKeys.detail(variables.brandId),
      });

      queryClient.invalidateQueries({
        queryKey: brandKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: brandKeys.active(),
      });
    },
  });
};

export const useActivateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (brandId: string) => brandApi.activateBrand(brandId),

    onSuccess: (_, brandId) => {
      queryClient.invalidateQueries({
        queryKey: brandKeys.detail(brandId),
      });

      queryClient.invalidateQueries({
        queryKey: brandKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: brandKeys.active(),
      });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (brandId: string) => brandApi.deleteBrand(brandId),

    onSuccess: (_, brandId) => {
      queryClient.removeQueries({
        queryKey: brandKeys.detail(brandId),
      });

      queryClient.invalidateQueries({
        queryKey: brandKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: brandKeys.active(),
      });
    },
  });
};
