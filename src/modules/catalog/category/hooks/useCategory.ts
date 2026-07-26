import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { categoryApi } from "../api/categoryApi";
import { categoryKeys } from "../api/categoryKeys";

import type {
  CreateCategoryRequest,
  MoveCategoryRequest,
  UpdateCategoryRequest,
} from "../types/category.types";

export const useCategory = (categoryId: string) =>
  useQuery({
    queryKey: categoryKeys.detail(categoryId),
    queryFn: () => categoryApi.getCategoryById(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });

export const useCategoryTree = () =>
  useQuery({
    queryKey: categoryKeys.tree(),
    queryFn: categoryApi.getCategoryTree,
    staleTime: 5 * 60 * 1000,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateCategoryRequest) =>
      categoryApi.createCategory(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      request,
    }: {
      categoryId: string;
      request: UpdateCategoryRequest;
    }) => categoryApi.updateCategory(categoryId, request),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(variables.categoryId),
      });

      queryClient.invalidateQueries({
        queryKey: categoryKeys.tree(),
      });
    },
  });
};

export const useMoveCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      request,
    }: {
      categoryId: string;
      request: MoveCategoryRequest;
    }) => categoryApi.moveCategory(categoryId, request),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(variables.categoryId),
      });

      queryClient.invalidateQueries({
        queryKey: categoryKeys.tree(),
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => categoryApi.deleteCategory(categoryId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
};
