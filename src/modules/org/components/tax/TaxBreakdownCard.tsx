import { Card } from "@/components/ui";

import type { TaxBreakdownDto } from "../../types/tax.types";

import { formatCurrency } from "@/lib/utils/currency";
interface TaxBreakdownCardProps {
  breakdown: TaxBreakdownDto;
}

const TaxBreakdownCard = ({ breakdown }: TaxBreakdownCardProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Tax Breakdown</h2>

          <p className="text-sm text-muted-foreground">
            Calculated tax for the selected transaction.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Taxable Amount</span>
            <span>{formatCurrency(breakdown.taxableAmount)}</span>
          </div>

          <div className="flex justify-between">
            <span>CGST</span>
            <span>{formatCurrency(breakdown.cgst)}</span>
          </div>

          <div className="flex justify-between">
            <span>SGST</span>
            <span>{formatCurrency(breakdown.sgst)}</span>
          </div>

          <div className="flex justify-between">
            <span>IGST</span>
            <span>{formatCurrency(breakdown.igst)}</span>
          </div>

          <div className="flex justify-between">
            <span>VAT</span>
            <span>{formatCurrency(breakdown.vat)}</span>
          </div>

          <div className="border-t pt-3" />

          <div className="flex justify-between font-semibold">
            <span>Total Tax</span>
            <span>{formatCurrency(breakdown.totalTax)}</span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span>{formatCurrency(breakdown.totalWithTax)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaxBreakdownCard;
