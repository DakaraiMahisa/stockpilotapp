import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "📊",
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: "📦",
  },
  {
    name: "Sales",
    href: "/sales",
    icon: "💰",
  },
  {
    name: "Customers",
    href: "/customers",
    icon: "👥",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "📈",
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-xl font-bold text-slate-900">StockPilot</h1>

        <p className="text-sm text-slate-500">SME Management Platform</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const active = location.pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{item.icon}</span>

                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
