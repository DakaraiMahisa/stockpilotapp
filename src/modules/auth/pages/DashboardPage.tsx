import AppLayout from "@/components/layout/AppLayout";

const DashboardPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

          <p className="mt-2 text-slate-600">Welcome back to StockPilot.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Total Sales</h3>

            <p className="mt-2 text-3xl font-bold text-slate-900">₹0</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">
              Inventory Items
            </h3>

            <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Customers</h3>

            <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">
              Low Stock Alerts
            </h3>

            <p className="mt-2 text-3xl font-bold text-red-600">0</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
