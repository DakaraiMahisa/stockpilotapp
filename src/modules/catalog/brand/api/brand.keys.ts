import type { BrandListParams } from "../types/brand.types";

export const brandKeys = {
  all: ["brands"] as const,

  lists: () => [...brandKeys.all, "list"] as const,

  list: (params: BrandListParams = {}) =>
    [...brandKeys.lists(), params] as const,

  details: () => [...brandKeys.all, "detail"] as const,

  detail: (brandId: string) => [...brandKeys.details(), brandId] as const,

  active: () => [...brandKeys.all, "active"] as const,
};
