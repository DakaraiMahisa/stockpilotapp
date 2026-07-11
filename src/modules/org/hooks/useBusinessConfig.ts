import { useQuery } from "@tanstack/react-query";

import { businessConfigApi } from "../api/businessConfigApi";
import { businessConfigKeys } from "../types/businessConfig";

export function useBusinessConfig() {
  return useQuery({
    queryKey: businessConfigKeys.detail(),
    queryFn: businessConfigApi.getConfiguration,
    staleTime: 30 * 60 * 1000,
  });
}
