import { useMutation, useQueryClient } from "@tanstack/react-query";

import { branchApi } from "../api/branchApi";
import { branchKeys } from "./branchKeys";

export function useSetDefaultBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (branchId: string) => branchApi.setDefaultBranch(branchId),

    onSuccess: (_, branchId) => {
      queryClient.invalidateQueries({
        queryKey: branchKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: branchKeys.detail(branchId),
      });
    },
  });
}
