import { useQuery } from "@tanstack/react-query";

import { dashboardApi } from "../api/dashboardApi";
import { dashboardKeys } from "../api/dashboardKeys";

export const useDashboard = () => {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: () => dashboardApi.getDashboard(),

    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes

    retry: 1,
    refetchOnWindowFocus: false,
  });
};
