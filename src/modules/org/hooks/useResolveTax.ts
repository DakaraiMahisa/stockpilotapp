import { useMutation } from "@tanstack/react-query";

import { taxApi } from "../api/taxApi";

import type { ResolveTaxParams } from "../types/tax.types";

export function useResolveTax() {
  return useMutation({
    mutationFn: ({ taxClassId, amount, transactionDate }: ResolveTaxParams) =>
      taxApi.resolveTax(taxClassId, amount, transactionDate),
  });
}
