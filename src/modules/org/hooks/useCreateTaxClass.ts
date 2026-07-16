import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taxApi } from "../api/taxApi";
import { taxKeys } from "./taxKeys";
import type { CreateTaxClassRequest } from "../types/tax.types";

export function useCreateTaxClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateTaxClassRequest) =>
      taxApi.createTaxClass(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taxKeys.all,
      });
    },
  });
}
