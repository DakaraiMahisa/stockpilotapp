import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { subscriptionApi } from "../api/subscriptionApi";

import type { SubscriptionUpgradeRequest } from "../types/subscription";

const SUBSCRIPTION_QUERY_KEY = ["subscription"] as const;

export const useSubscription = () =>
  useQuery({
    queryKey: SUBSCRIPTION_QUERY_KEY,
    queryFn: subscriptionApi.getCurrentSubscription,
    staleTime: 5 * 60 * 1000,
  });

export const useSubmitUpgradeRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SubscriptionUpgradeRequest) =>
      subscriptionApi.submitUpgradeRequest(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUBSCRIPTION_QUERY_KEY,
      });
    },
  });
};
