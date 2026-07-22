import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SIDEBAR } from "@/config/sidebar";
import { usePermissions } from "@/hooks/usePermissions";
import Logo from "@/assets/smelogo.png";

const Sidebar = () => {
  const location = useLocation();

  const { hasPermission } = usePermissions();

  const defaultExpandedGroups = SIDEBAR.flatMap((section) => {
    if (section.type !== "group") {
      return [];
    }

    const isActive = section.group.children.some(
      (child) =>
        location.pathname === child.href ||
        location.pathname.startsWith(`${child.href}/`),
    );

    return isActive ? [section.group.label] : [];
  });

  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    defaultExpandedGroups,
  );

  const toggleGroup = (groupLabel: string) => {
    setExpandedGroups((current) =>
      current.includes(groupLabel)
        ? current.filter((label) => label !== groupLabel)
        : [...current, groupLabel],
    );
  };

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-border bg-background lg:flex lg:flex-col">
      {/* Brand */}
      <div className="border-b border-border px-6 py-6">
        <div className="flex items-center gap-4">
          <img
            src={Logo}
            alt="StockPilot"
            className="h-12 w-12 rounded-lg object-contain"
          />

          <div>
            <h1 className="text-xl font-bold tracking-tight">StockPilot</h1>

            <p className="text-xs text-muted-foreground">
              SME Management Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-5">
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
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <span>{item.label}</span>

                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
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
                  className="mb-2 flex w-full items-center rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors duration-200 hover:bg-muted"
                >
                  {expanded ? (
                    <ChevronDown className="mr-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="mr-2 h-4 w-4" />
                  )}

                  <GroupIcon className="mr-2 h-4 w-4" />

                  <span>{group.label}</span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    expanded ? "max-h-250 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
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
                          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            active
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5 shrink-0" />

                          <span className="truncate">{item.label}</span>

                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-6 py-4">
        <p className="text-sm font-medium text-foreground">StockPilot</p>

        <p className="mt-1 text-xs text-muted-foreground">
          SME Management Platform
        </p>

        <p className="mt-3 text-xs text-muted-foreground">Version 1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
