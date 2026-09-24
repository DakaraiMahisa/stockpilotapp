import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { productVariantApi } from "../api/productVariant.api";
import { productVariantKeys } from "../api/productVariant.keys";

import type {
  ProductVariantCreateRequest,
  ProductVariantUpdateRequest,
} from "../types/productVariant.types";

export const useProductVariants = (productId: string) => {
  return useQuery({
    queryKey: productVariantKeys.list(productId),
    queryFn: () => productVariantApi.getVariantsByProductId(productId),
    enabled: Boolean(productId),
  });
};

export const useProductVariant = (productId: string, variantId: string) => {
  return useQuery({
    queryKey: productVariantKeys.detail(productId, variantId),
    queryFn: () => productVariantApi.getVariantById(productId, variantId),
    enabled: Boolean(productId && variantId),
  });
};

export const useProductVariantAttributes = (productId: string) => {
  return useQuery({
    queryKey: productVariantKeys.attributes(productId),
    queryFn: () => productVariantApi.getVariantAttributes(productId),
    enabled: Boolean(productId),
  });
};

/**
 * Create one or more variants for a product.
 */
export const useCreateProductVariants = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      requests,
    }: {
      productId: string;
      requests: ProductVariantCreateRequest[];
    }) => productVariantApi.createVariants(productId, requests),

    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({
        queryKey: productVariantKeys.list(productId),
      });
    },
  });
};

export const useUpdateProductVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      variantId,
      request,
    }: {
      productId: string;
      variantId: string;
      request: ProductVariantUpdateRequest;
    }) => productVariantApi.updateVariant(productId, variantId, request),

    onSuccess: (_, { productId, variantId }) => {
      queryClient.invalidateQueries({
        queryKey: productVariantKeys.detail(productId, variantId),
      });

      queryClient.invalidateQueries({
        queryKey: productVariantKeys.list(productId),
      });
    },
  });
};

export const useDeactivateProductVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      variantId,
    }: {
      productId: string;
      variantId: string;
    }) => productVariantApi.deactivateVariant(productId, variantId),

    onSuccess: (_, { productId, variantId }) => {
      queryClient.invalidateQueries({
        queryKey: productVariantKeys.detail(productId, variantId),
      });

      queryClient.invalidateQueries({
        queryKey: productVariantKeys.list(productId),
      });
    },
  });
};

export const useDeleteProductVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      variantId,
    }: {
      productId: string;
      variantId: string;
    }) => productVariantApi.deleteVariant(productId, variantId),

    onSuccess: (_, { productId, variantId }) => {
      queryClient.removeQueries({
        queryKey: productVariantKeys.detail(productId, variantId),
      });

      queryClient.invalidateQueries({
        queryKey: productVariantKeys.list(productId),
      });
    },
  });
};

export const useAssignVariantAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      attributeId,
    }: {
      productId: string;
      attributeId: string;
    }) => productVariantApi.assignVariantAttribute(productId, attributeId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productVariantKeys.attributes(variables.productId),
      });
    },
  });
};

export const useRemoveVariantAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      attributeId,
    }: {
      productId: string;
      attributeId: string;
    }) => productVariantApi.removeVariantAttribute(productId, attributeId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productVariantKeys.attributes(variables.productId),
      });
    },
  });
};
