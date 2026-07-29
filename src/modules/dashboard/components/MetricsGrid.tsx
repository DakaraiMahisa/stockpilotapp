import {
  Boxes,
  DollarSign,
  PackageSearch,
  ShoppingCart,
  TriangleAlert,
  Users,
} from "lucide-react";

import MetricCard from "./MetricCard";

import type { DashboardSummary } from "../types";

interface MetricsGridProps {
  summary: DashboardSummary;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const numberFormatter = new Intl.NumberFormat("en-US");

const MetricsGrid = ({ summary }: MetricsGridProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      <MetricCard
        title="Revenue"
        value={currencyFormatter.format(summary.totalRevenue)}
        icon={DollarSign}
        trend="+12.8%"
      />

      <MetricCard
        title="Orders"
        value={numberFormatter.format(summary.totalOrders)}
        icon={ShoppingCart}
        trend="+8.3%"
      />

      <MetricCard
        title="Customers"
        value={numberFormatter.format(summary.totalCustomers)}
        icon={Users}
        trend="+5.1%"
      />

      <MetricCard
        title="Products"
        value={numberFormatter.format(summary.totalProducts)}
        icon={Boxes}
      />

      <MetricCard
        title="Inventory"
        value={numberFormatter.format(summary.inventoryItems)}
        icon={PackageSearch}
      />

      <MetricCard
        title="Low Stock"
        value={numberFormatter.format(summary.lowStockItems)}
        icon={TriangleAlert}
        trend="-4"
        trendPositive={false}
      />
    </div>
  );
};

export default MetricsGrid;
