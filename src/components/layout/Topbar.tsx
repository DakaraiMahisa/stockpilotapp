import UserMenu from "./UserMenu";

const Topbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900">Welcome Back</p>

          <p className="text-xs text-slate-500">StockPilot User</p>
        </div>

        <UserMenu />
      </div>
    </header>
  );
};

export default Topbar;
