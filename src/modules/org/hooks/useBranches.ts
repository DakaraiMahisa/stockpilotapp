import { useQuery } from "@tanstack/react-query";

import { branchApi } from "../api/branchApi";
import { branchKeys } from "./branchKeys";
import type { BranchQueryParams } from "../types/org.types";

export function useBranches(params: BranchQueryParams) {
  return useQuery({
    queryKey: branchKeys.list(params),
    queryFn: () => branchApi.getBranches(params),
    staleTime: 5 * 60 * 1000,
  });
}
