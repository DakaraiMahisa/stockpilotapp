import apiClient from "@/lib/apiClient";

import type { ApiResponse } from "@/types/api";

import type {
  SubscriptionDto,
  SubscriptionUpgradeRequest,
  UpgradeRequestResponse,
} from "../types/subscription";

const BASE_URL = "/api/v1/org/subscriptions";

export const subscriptionApi = {
  getCurrentSubscription: async (): Promise<ApiResponse<SubscriptionDto>> => {
    const { data } =
      await apiClient.get<ApiResponse<SubscriptionDto>>(BASE_URL);

    return data;
  },

  submitUpgradeRequest: async (
    request: SubscriptionUpgradeRequest,
  ): Promise<ApiResponse<UpgradeRequestResponse>> => {
    const { data } = await apiClient.post<ApiResponse<UpgradeRequestResponse>>(
      `${BASE_URL}/upgrade-request`,
      request,
    );

    return data;
  },
};
