export const productVariantKeys = {
  all: ["product-variants"] as const,

  lists: () => [...productVariantKeys.all, "list"] as const,

  list: (productId: string) =>
    [...productVariantKeys.lists(), productId] as const,

  details: () => [...productVariantKeys.all, "detail"] as const,

  detail: (productId: string, variantId: string) =>
    [...productVariantKeys.details(), productId, variantId] as const,

  attributes: (productId: string) =>
    [...productVariantKeys.all, "attributes", productId] as const,
};
