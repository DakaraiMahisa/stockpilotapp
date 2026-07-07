import { useMutation, useQueryClient } from "@tanstack/react-query";

import { branchApi } from "../api/branchApi";
import { branchKeys } from "./branchKeys";
import { type UpdateBranchStatusRequest } from "../types/org.types";
export function useUpdateBranchStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: UpdateBranchStatusRequest;
    }) => branchApi.updateBranchStatus(id, request),

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
