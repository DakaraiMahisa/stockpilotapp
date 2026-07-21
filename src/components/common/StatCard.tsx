import type { ReactNode } from "react";

import { Card } from "@/components/ui";

interface StatCardProps {
  title: string;
  value: ReactNode;
  description?: string;
  icon?: ReactNode;
  footer?: ReactNode;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  footer,
}: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <div className="text-3xl font-bold tracking-tight">{value}</div>

          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>

      {footer && <div className="mt-4 border-t pt-4">{footer}</div>}
    </Card>
  );
}
export default StatCard;
