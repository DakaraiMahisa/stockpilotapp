import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;

  trend?: string;
  trendPositive?: boolean;

  subtitle?: string;
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendPositive = true,
  subtitle,
}: MetricCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-text-secondary">{title}</p>

          <h2 className="text-3xl font-bold text-text-primary">{value}</h2>

          {subtitle && (
            <p className="text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-tint">
          <Icon className="h-6 w-6 text-brand" />
        </div>
      </div>

      {trend && (
        <div className="mt-5 flex items-center gap-2">
          <span
            className={`text-sm font-semibold ${
              trendPositive ? "text-success" : "text-danger"
            }`}
          >
            {trend}
          </span>

          <span className="text-sm text-text-secondary">vs last month</span>
        </div>
      )}
    </Card>
  );
};

export default MetricCard;
