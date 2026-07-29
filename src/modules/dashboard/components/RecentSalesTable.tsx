import { Card } from "@/components/ui";

import type { RecentSale, SaleStatus } from "../types";

interface RecentSalesTableProps {
  sales: RecentSale[];
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const STATUS_CLASSES: Record<SaleStatus, string> = {
  PAID: "bg-success-tint text-success",
  PENDING: "bg-warning-tint text-warning",
  PARTIALLY_PAID: "bg-brand-tint text-brand",
  CANCELLED: "bg-danger-tint text-danger",
};

const RecentSalesTable = ({ sales }: RecentSalesTableProps) => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Recent Sales
        </h3>

        <p className="text-sm text-text-secondary">
          Latest completed and pending transactions.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr>
              <th className="px-3 py-3 text-left font-medium text-text-secondary">
                Invoice
              </th>

              <th className="px-3 py-3 text-left font-medium text-text-secondary">
                Customer
              </th>

              <th className="px-3 py-3 text-right font-medium text-text-secondary">
                Amount
              </th>

              <th className="px-3 py-3 text-center font-medium text-text-secondary">
                Status
              </th>

              <th className="px-3 py-3 text-right font-medium text-text-secondary">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-3 py-4 font-medium text-text-primary">
                  {sale.invoiceNumber}
                </td>

                <td className="px-3 py-4 text-text-primary">{sale.customer}</td>

                <td className="px-3 py-4 text-right font-semibold text-text-primary">
                  {currencyFormatter.format(sale.amount)}
                </td>

                <td className="px-3 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASSES[sale.status]}`}
                  >
                    {sale.status.replace("_", " ")}
                  </span>
                </td>

                <td className="px-3 py-4 text-right text-text-secondary">
                  {dateFormatter.format(new Date(sale.createdAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentSalesTable;
