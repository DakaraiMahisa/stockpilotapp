import { CalendarDays } from "lucide-react";

interface DashboardHeaderProps {
  businessName?: string;
}

const DashboardHeader = ({
  businessName = "StockPilot",
}: DashboardHeaderProps) => {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>

        <p className="text-text-secondary">
          Welcome back. Here's what's happening across{" "}
          <span className="font-semibold text-text-primary">
            {businessName}
          </span>
          .
        </p>
      </div>

      <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 shadow-sm">
        <CalendarDays className="size-4 text-brand" />

        <span className="text-sm text-text-secondary">{today}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
