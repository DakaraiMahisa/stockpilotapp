export interface DashboardSummary {
  totalRevenue: number;
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  inventoryItems: number;
  inventoryValue: number;
  lowStockItems: number;
  pendingPurchaseOrders: number;
}

export interface SalesTrend {
  month: string;
  revenue: number;
  orders: number;
}

export interface InventoryCategory {
  category: string;
  value: number;
  items: number;
}

export interface TopProduct {
  id: string;
  name: string;
  sku: string;
  quantitySold: number;
  revenue: number;
}

export interface LowStockItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  reorderLevel: number;
}

export type SaleStatus = "PAID" | "PENDING" | "PARTIALLY_PAID" | "CANCELLED";

export interface RecentSale {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: SaleStatus;
  createdAt: string;
}

export interface DashboardDto {
  summary: DashboardSummary;

  salesTrend: SalesTrend[];

  inventoryCategories: InventoryCategory[];

  topProducts: TopProduct[];

  lowStockItems: LowStockItem[];

  recentSales: RecentSale[];
}
