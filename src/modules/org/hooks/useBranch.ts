import { useQuery } from "@tanstack/react-query";

import { branchApi } from "../api/branchApi";
import { branchKeys } from "./branchKeys";

export function useBranch(branchId: string) {
  return useQuery({
    queryKey: branchKeys.detail(branchId),
    queryFn: () => branchApi.getBranch(branchId),
    enabled: !!branchId,
    staleTime: 5 * 60 * 1000,
  });
}
