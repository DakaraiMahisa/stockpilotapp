import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SIDEBAR } from "@/config/sidebar";
import { usePermissions } from "@/hooks/usePermissions";

const Sidebar = () => {
  const location = useLocation();

  const { hasPermission } = usePermissions();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "Operations",
  ]);

  const toggleGroup = (groupLabel: string) => {
    setExpandedGroups((current) =>
      current.includes(groupLabel)
        ? current.filter((label) => label !== groupLabel)
        : [...current, groupLabel],
    );
  };

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-xl font-bold text-slate-900">StockPilot</h1>

        <p className="text-sm text-slate-500">SME Management Platform</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {SIDEBAR.map((section) => {
            if (section.type === "item") {
              const item = section.item;

              if (item.permission && !hasPermission(item.permission)) {
                return null;
              }

              const Icon = item.icon;

              const active =
                location.pathname === item.href ||
                location.pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <span>{item.label}</span>
                </Link>
              );
            }

            const group = section.group;
            const expanded = expandedGroups.includes(group.label);
            const visibleChildren = group.children.filter(
              (child) => !child.permission || hasPermission(child.permission),
            );

            if (visibleChildren.length === 0) {
              return null;
            }

            const GroupIcon = group.icon;

            return (
              <section key={group.label}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  className="mb-2 flex w-full items-center rounded-lg px-2 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 transition hover:bg-slate-100"
                >
                  {expanded ? (
                    <ChevronDown className="mr-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="mr-2 h-4 w-4" />
                  )}

                  <GroupIcon className="mr-2 h-4 w-4" />

                  <span>{group.label}</span>
                </button>

                {expanded && (
                  <div className="space-y-1">
                    {visibleChildren.map((item) => {
                      const Icon = item.icon;

                      const active =
                        location.pathname === item.href ||
                        location.pathname.startsWith(`${item.href}/`);

                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                            active
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <Icon className="h-5 w-5 shrink-0" />

                          <span className="truncate">{item.label}</span>

                          {item.badge && (
                            <span className="ml-auto rounded bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
