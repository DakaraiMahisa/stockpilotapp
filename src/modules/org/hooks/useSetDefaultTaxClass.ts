import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taxApi } from "../api/taxApi";
import { taxKeys } from "./taxKeys";

export function useSetDefaultTaxClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taxApi.setDefaultTaxClass(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taxKeys.all,
      });
    },
  });
}
