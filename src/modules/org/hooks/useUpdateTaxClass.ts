import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taxApi } from "../api/taxApi";
import { taxKeys } from "./taxKeys";
import type { UpdateTaxClassRequest } from "../types/tax.types";

interface UpdateTaxClassMutation {
  id: string;
  request: UpdateTaxClassRequest;
}

export function useUpdateTaxClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: UpdateTaxClassMutation) =>
      taxApi.updateTaxClass(id, request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taxKeys.all,
      });
    },
  });
}
