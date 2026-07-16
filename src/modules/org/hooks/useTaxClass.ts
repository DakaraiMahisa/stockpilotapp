import { useQuery } from "@tanstack/react-query";

import { taxApi } from "../api/taxApi";
import { taxKeys } from "./taxKeys";

export function useTaxClass(id: string) {
  return useQuery({
    queryKey: taxKeys.detail(id),
    queryFn: () => taxApi.getTaxClass(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
