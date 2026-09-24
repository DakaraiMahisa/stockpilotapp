import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../api/product.api";
import { productKeys } from "../api/product.keys";
import type {
  ProductCreateRequest,
  ProductListParams,
  ProductUpdateRequest,
} from "../types/product.types";

export const useProduct = (productId: string) =>
  useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => productApi.getProductById(productId),
    enabled: Boolean(productId),
    staleTime: 5 * 60 * 1000,
  });

export const useProducts = (params: ProductListParams = {}) =>
  useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productApi.getProducts(params),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

export const useProductBySku = (sku: string) =>
  useQuery({
    queryKey: productKeys.sku(sku),
    queryFn: () => productApi.getProductBySku(sku),
    enabled: Boolean(sku),
    staleTime: 5 * 60 * 1000,
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ProductCreateRequest) =>
      productApi.createProduct(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      request,
    }: {
      productId: string;
      request: ProductUpdateRequest;
    }) => productApi.updateProduct(productId, request),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.productId),
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
};

export const useDeactivateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productApi.deactivateProduct(productId),

    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
};

export const useActivateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productApi.activateProduct(productId),

    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
};
