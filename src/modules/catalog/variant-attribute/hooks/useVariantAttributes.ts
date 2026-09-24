import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { variantAttributeApi } from "../api/variantAttributeApi";
import { variantAttributeKeys } from "../api/variantAttribute.keys";

import type {
  CreateVariantAttributeRequest,
  CreateVariantAttributeValueRequest,
  UpdateVariantAttributeRequest,
  UpdateVariantAttributeValueRequest,
} from "../types/variantAttribute";

// -----------------------------------------------------------------------------
// Queries
// -----------------------------------------------------------------------------

export const useVariantAttributes = () =>
  useQuery({
    queryKey: variantAttributeKeys.list(),
    queryFn: variantAttributeApi.getAll,
    staleTime: 5 * 60 * 1000,
  });

export const useVariantAttribute = (attributeId: string) =>
  useQuery({
    queryKey: variantAttributeKeys.detail(attributeId),
    queryFn: () => variantAttributeApi.getById(attributeId),
    enabled: Boolean(attributeId),
    staleTime: 5 * 60 * 1000,
  });

export const useVariantAttributeValues = (attributeId: string) =>
  useQuery({
    queryKey: variantAttributeKeys.valueList(attributeId),
    queryFn: () => variantAttributeApi.getValues(attributeId),
    enabled: Boolean(attributeId),
    staleTime: 5 * 60 * 1000,
  });

export const useVariantAttributeValue = (
  attributeId: string,
  valueId: string,
) =>
  useQuery({
    queryKey: variantAttributeKeys.valueDetail(attributeId, valueId),
    queryFn: () => variantAttributeApi.getValueById(attributeId, valueId),
    enabled: Boolean(attributeId) && Boolean(valueId),
    staleTime: 5 * 60 * 1000,
  });

// -----------------------------------------------------------------------------
// Attribute mutations
// -----------------------------------------------------------------------------

export const useCreateVariantAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateVariantAttributeRequest) =>
      variantAttributeApi.create(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.lists(),
      });
    },
  });
};

export const useUpdateVariantAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      attributeId,
      request,
    }: {
      attributeId: string;
      request: UpdateVariantAttributeRequest;
    }) => variantAttributeApi.update(attributeId, request),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.detail(variables.attributeId),
      });
    },
  });
};

export const useActivateVariantAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attributeId: string) =>
      variantAttributeApi.activate(attributeId),

    onSuccess: (_, attributeId) => {
      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.detail(attributeId),
      });
    },
  });
};

export const useDeactivateVariantAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attributeId: string) =>
      variantAttributeApi.deactivate(attributeId),

    onSuccess: (_, attributeId) => {
      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.detail(attributeId),
      });
    },
  });
};

export const useDeleteVariantAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attributeId: string) =>
      variantAttributeApi.remove(attributeId),

    onSuccess: (_, attributeId) => {
      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: variantAttributeKeys.detail(attributeId),
      });

      queryClient.removeQueries({
        queryKey: variantAttributeKeys.valueList(attributeId),
      });
    },
  });
};

// -----------------------------------------------------------------------------
// Value mutations
// -----------------------------------------------------------------------------

export const useCreateVariantAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      attributeId,
      request,
    }: {
      attributeId: string;
      request: CreateVariantAttributeValueRequest;
    }) => variantAttributeApi.createValue(attributeId, request),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.valueList(variables.attributeId),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.detail(variables.attributeId),
      });
    },
  });
};

export const useUpdateVariantAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      attributeId,
      valueId,
      request,
    }: {
      attributeId: string;
      valueId: string;
      request: UpdateVariantAttributeValueRequest;
    }) => variantAttributeApi.updateValue(attributeId, valueId, request),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.valueList(variables.attributeId),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.valueDetail(
          variables.attributeId,
          variables.valueId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.detail(variables.attributeId),
      });
    },
  });
};

export const useActivateVariantAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      attributeId,
      valueId,
    }: {
      attributeId: string;
      valueId: string;
    }) => variantAttributeApi.activateValue(attributeId, valueId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.valueList(variables.attributeId),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.valueDetail(
          variables.attributeId,
          variables.valueId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.detail(variables.attributeId),
      });
    },
  });
};

export const useDeactivateVariantAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      attributeId,
      valueId,
    }: {
      attributeId: string;
      valueId: string;
    }) => variantAttributeApi.deactivateValue(attributeId, valueId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.valueList(variables.attributeId),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.valueDetail(
          variables.attributeId,
          variables.valueId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.detail(variables.attributeId),
      });
    },
  });
};

export const useDeleteVariantAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      attributeId,
      valueId,
    }: {
      attributeId: string;
      valueId: string;
    }) => variantAttributeApi.removeValue(attributeId, valueId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.valueList(variables.attributeId),
      });

      queryClient.removeQueries({
        queryKey: variantAttributeKeys.valueDetail(
          variables.attributeId,
          variables.valueId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: variantAttributeKeys.detail(variables.attributeId),
      });
    },
  });
};
