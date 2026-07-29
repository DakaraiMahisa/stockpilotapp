import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui";

import type { SalesTrend } from "../types";

interface SalesTrendChartProps {
  data: SalesTrend[];
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const SalesTrendChart = ({ data }: SalesTrendChartProps) => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Revenue Trend
        </h3>

        <p className="text-sm text-text-secondary">
          Monthly revenue performance.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-brand)"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="var(--color-brand)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{
                fill: "var(--color-text-secondary)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) => currencyFormatter.format(value)}
              tick={{
                fill: "var(--color-text-secondary)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [
                currencyFormatter.format(Number(value)),
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-brand)"
              strokeWidth={3}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SalesTrendChart;
