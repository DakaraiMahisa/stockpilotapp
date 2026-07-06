import type { BranchQueryParams } from "../types/org.types";

export const branchKeys = {
  all: ["branches"] as const,

  list: (params: BranchQueryParams) => [...branchKeys.all, params] as const,
  detail: (id: string) => [...branchKeys.all, "detail", id] as const,
};
