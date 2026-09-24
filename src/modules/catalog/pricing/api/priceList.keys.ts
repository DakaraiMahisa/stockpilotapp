export const priceListKeys = {
  all: ["price-lists"] as const,

  lists: () => [...priceListKeys.all, "list"] as const,

  list: (page: number, size: number, sort: string) =>
    [...priceListKeys.lists(), { page, size, sort }] as const,

  details: () => [...priceListKeys.all, "detail"] as const,

  detail: (priceListId: string) =>
    [...priceListKeys.details(), priceListId] as const,

  items: (priceListId: string) =>
    [...priceListKeys.all, "items", priceListId] as const,
};
