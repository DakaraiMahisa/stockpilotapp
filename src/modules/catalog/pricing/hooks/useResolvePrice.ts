import { useMutation } from "@tanstack/react-query";

import { pricingApi } from "../api/pricingApi";

import type { PriceResolveRequest } from "../types/pricing.types";

export function useResolvePrice() {
  return useMutation({
    mutationFn: (request: PriceResolveRequest) =>
      pricingApi.resolvePrice(request),
  });
}
