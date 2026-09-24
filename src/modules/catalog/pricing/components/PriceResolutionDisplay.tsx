import { CheckCircle2 } from "lucide-react";

import { Badge, Card } from "@/components/ui";

import type { PriceResolveResponse } from "../types/pricing.types";

interface PriceResolutionDisplayProps {
  result: PriceResolveResponse | null;
}

const PriceResolutionDisplay = ({ result }: PriceResolutionDisplayProps) => {
  if (!result) {
    return null;
  }

  const discount = result.discountPct ?? 0;

  return (
    <Card className="space-y-5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-text-secondary">Resolved Selling Price</p>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-text-primary">
              {result.effectiveUnitPrice.toFixed(4)}
            </span>

            <span className="text-sm text-text-secondary">
              {result.currencyCode}
            </span>
          </div>
        </div>

        <Badge variant="secondary">
          <CheckCircle2 className="mr-1 size-3.5" />
          Resolved
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Price List
          </p>

          <p className="mt-1 text-sm font-medium text-text-primary">
            {result.priceListCode}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Quantity
          </p>

          <p className="mt-1 text-sm font-medium text-text-primary">
            {result.quantity}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Minimum Quantity
          </p>

          <p className="mt-1 text-sm font-medium text-text-primary">
            {result.minQuantity}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Base Unit Price
          </p>

          <p className="mt-1 text-sm font-medium text-text-primary">
            {result.unitPrice.toFixed(4)} {result.currencyCode}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Discount
          </p>

          <p className="mt-1 text-sm font-medium text-text-primary">
            {discount.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            Pricing Rule
          </p>

          <p className="mt-1 text-sm font-medium text-text-primary">
            {result.variantId ? "Variant-specific" : "Product-level"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PriceResolutionDisplay;
