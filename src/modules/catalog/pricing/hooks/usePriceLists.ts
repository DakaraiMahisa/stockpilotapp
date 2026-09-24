import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { priceListApi } from "../api/priceListApi";
import { priceListKeys } from "../api/priceList.keys";

import type {
  CreatePriceListRequest,
  UpdatePriceListRequest,
  PriceListItemRequest,
} from "../types/priceList.types";

export function usePriceLists(page = 0, size = 20, sort = "name,asc") {
  return useQuery({
    queryKey: priceListKeys.list(page, size, sort),
    queryFn: () => priceListApi.getAll(page, size, sort),
  });
}

export function usePriceList(priceListId: string) {
  return useQuery({
    queryKey: priceListKeys.detail(priceListId),
    queryFn: () => priceListApi.getById(priceListId),
    enabled: Boolean(priceListId),
  });
}

export function usePriceListItems(priceListId: string) {
  return useQuery({
    queryKey: priceListKeys.items(priceListId),
    queryFn: () => priceListApi.getItems(priceListId),
    enabled: Boolean(priceListId),
  });
}

export function useCreatePriceList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreatePriceListRequest) =>
      priceListApi.create(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: priceListKeys.lists(),
      });
    },
  });
}

export function useUpdatePriceList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      priceListId,
      request,
    }: {
      priceListId: string;
      request: UpdatePriceListRequest;
    }) => priceListApi.update(priceListId, request),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: priceListKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: priceListKeys.detail(variables.priceListId),
      });
    },
  });
}

export function useDeletePriceList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (priceListId: string) => priceListApi.remove(priceListId),

    onSuccess: (_, priceListId) => {
      queryClient.invalidateQueries({
        queryKey: priceListKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: priceListKeys.detail(priceListId),
      });

      queryClient.removeQueries({
        queryKey: priceListKeys.items(priceListId),
      });
    },
  });
}

export function useUpsertPriceListItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      priceListId,
      requests,
    }: {
      priceListId: string;
      requests: PriceListItemRequest[];
    }) => priceListApi.upsertItems(priceListId, requests),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: priceListKeys.items(variables.priceListId),
      });
    },
  });
}

export function useDeletePriceListItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      priceListId,
      itemId,
    }: {
      priceListId: string;
      itemId: string;
    }) => priceListApi.deleteItem(priceListId, itemId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: priceListKeys.items(variables.priceListId),
      });
    },
  });
}
