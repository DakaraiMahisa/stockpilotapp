import AppLayout from "@/components/layout/AppLayout";

import DashboardHeader from "../components/DashboardHeader";
import InventoryCategoryChart from "../components/InventoryCategoryChart";
import MetricsGrid from "../components/MetricsGrid";
import DashboardGreeting from "../components/DashboardGreeting";
import RecentSalesTable from "../components/RecentSalesTable";
import SalesTrendChart from "../components/SalesTrendChart";

import { useDashboard } from "../hooks/useDashboard";

const DashboardPage = () => {
  const { data, isPending, isError } = useDashboard();

  if (isPending) {
    return (
      <AppLayout>
        <div className="py-16 text-center text-text-secondary">
          Loading dashboard...
        </div>
      </AppLayout>
    );
  }

  if (isError || !data) {
    return (
      <AppLayout>
        <div className="py-16 text-center text-danger">
          Failed to load dashboard.
        </div>
      </AppLayout>
    );
  }

  const dashboard = data.data;

  return (
    <AppLayout>
      <div className="space-y-8">
        <DashboardHeader businessName="StockPilot" />
        <DashboardGreeting />
        <MetricsGrid summary={dashboard.summary} />

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <SalesTrendChart data={dashboard.salesTrend} />
          </div>

          <InventoryCategoryChart data={dashboard.inventoryCategories} />
        </div>

        <RecentSalesTable sales={dashboard.recentSales} />
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
