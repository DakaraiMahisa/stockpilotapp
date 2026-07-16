import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taxApi } from "../api/taxApi";
import { taxKeys } from "./taxKeys";
import type { CreateTaxRateRequest } from "../types/tax.types";

interface AddTaxRateMutation {
  taxClassId: string;
  request: CreateTaxRateRequest;
}

export function useAddTaxRate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taxClassId, request }: AddTaxRateMutation) =>
      taxApi.addTaxRate(taxClassId, request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taxKeys.all,
      });
    },
  });
}
