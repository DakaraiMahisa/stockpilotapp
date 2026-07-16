import { useQuery } from "@tanstack/react-query";

import { taxApi } from "../api/taxApi";
import { taxKeys } from "./taxKeys";

export function useTaxClasses(activeOnly = true) {
  return useQuery({
    queryKey: taxKeys.classes({ activeOnly }),
    queryFn: () => taxApi.getTaxClasses(activeOnly),
    staleTime: 30 * 60 * 1000,
  });
}
