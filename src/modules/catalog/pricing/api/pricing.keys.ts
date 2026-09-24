export const pricingKeys = {
  all: ["pricing"] as const,

  resolvedPrice: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
    date?: string,
  ) =>
    [
      ...pricingKeys.all,
      "resolved-price",
      {
        productId,
        variantId,
        quantity,
        date,
      },
    ] as const,
};
