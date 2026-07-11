import { useMutation, useQueryClient } from "@tanstack/react-query";

import { businessConfigApi } from "../api/businessConfigApi";
import type { BusinessConfigUpdateRequest } from "../types/businessConfig";
import { businessConfigKeys } from "../types/businessConfig";

export function useUpdateBusinessConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: BusinessConfigUpdateRequest) =>
      businessConfigApi.updateConfiguration(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: businessConfigKeys.all,
      });
    },
  });
}
