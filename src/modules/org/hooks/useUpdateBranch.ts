import { useMutation, useQueryClient } from "@tanstack/react-query";

import { branchApi } from "../api/branchApi";
import { type UpdateBranchRequest } from "../types/org.types";
import { branchKeys } from "./branchKeys";

export function useUpdateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: UpdateBranchRequest;
    }) => branchApi.updateBranch(id, request),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: branchKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: branchKeys.detail(variables.id),
      });
    },
  });
}
