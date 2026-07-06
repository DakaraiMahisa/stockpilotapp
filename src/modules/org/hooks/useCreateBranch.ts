import { useMutation, useQueryClient } from "@tanstack/react-query";

import { branchApi } from "../api/branchApi";
import { branchKeys } from "./branchKeys";

export function useCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: branchApi.createBranch,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: branchKeys.all,
      });
    },
  });
}
