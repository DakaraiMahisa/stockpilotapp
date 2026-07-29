export const dashboardKeys = {
  all: ["dashboard"] as const,

  summary: () => [...dashboardKeys.all, "summary"] as const,

  metrics: () => [...dashboardKeys.all, "metrics"] as const,

  salesTrend: () => [...dashboardKeys.all, "sales-trend"] as const,

  inventory: () => [...dashboardKeys.all, "inventory"] as const,

  topProducts: () => [...dashboardKeys.all, "top-products"] as const,

  lowStock: () => [...dashboardKeys.all, "low-stock"] as const,

  recentSales: () => [...dashboardKeys.all, "recent-sales"] as const,
};
