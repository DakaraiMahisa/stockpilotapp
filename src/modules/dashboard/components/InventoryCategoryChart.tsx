import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card } from "@/components/ui";

import type { InventoryCategory } from "../types";

interface InventoryCategoryChartProps {
  data: InventoryCategory[];
}

const COLORS = [
  "var(--color-brand)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-danger)",
  "var(--color-text-secondary)",
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const InventoryCategoryChart = ({ data }: InventoryCategoryChartProps) => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Inventory Distribution
        </h3>

        <p className="text-sm text-text-secondary">
          Inventory value by category.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                currencyFormatter.format(Number(value)),
                "Inventory Value",
              ]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default InventoryCategoryChart;
