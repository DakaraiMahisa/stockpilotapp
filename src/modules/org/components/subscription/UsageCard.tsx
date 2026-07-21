import { Card } from "@/components/ui";
import Progress from "@/components/ui/Progress";
import { StatCard } from "@/components/common";

import type { SubscriptionUsageDto } from "../../types/subscription";
import type { SubscriptionLimitsDto } from "../../types/subscription";

interface UsageCardProps {
  usage: SubscriptionUsageDto;
  limits: SubscriptionLimitsDto;
}

const UsageCard = ({ usage, limits }: UsageCardProps) => {
  const metrics = [
    {
      title: "Users",
      value: usage.users,
      max: limits.maxUsers,
      description: "Active users",
    },
    {
      title: "Branches",
      value: usage.branches,
      max: limits.maxBranches,
      description: "Active branches",
    },
    {
      title: "Products",
      value: usage.skus,
      max: limits.maxSkus,
      description: "Products (SKUs)",
    },
  ];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Resource Usage</h2>

        <p className="text-sm text-muted-foreground">
          Monitor your current subscription usage.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <StatCard
            key={metric.title}
            title={metric.title}
            value={`${metric.value} / ${metric.max}`}
            description={metric.description}
            footer={
              <Progress value={metric.value} max={metric.max} showLabel />
            }
          />
        ))}
      </div>
    </Card>
  );
};

export default UsageCard;
