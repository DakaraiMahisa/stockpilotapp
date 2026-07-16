export interface TaxClassQueryParams {
  activeOnly?: boolean;
}

export const taxKeys = {
  all: ["tax"] as const,

  classes: (params: TaxClassQueryParams) =>
    [...taxKeys.all, "classes", params] as const,

  detail: (id: string) => [...taxKeys.all, "detail", id] as const,

  resolve: (taxClassId: string, amount: number, transactionDate: string) =>
    [...taxKeys.all, "resolve", taxClassId, amount, transactionDate] as const,
};
