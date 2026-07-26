export const categoryKeys = {
  all: ["categories"] as const,

  tree: () => [...categoryKeys.all, "tree"] as const,

  detail: (categoryId: string) =>
    [...categoryKeys.all, "detail", categoryId] as const,
};
