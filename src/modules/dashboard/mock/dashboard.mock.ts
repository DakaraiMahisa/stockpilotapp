import type { DashboardDto } from "../types";

export const dashboardMock: DashboardDto = {
  summary: {
    totalRevenue: 2487500,
    totalSales: 846,
    totalOrders: 912,
    totalCustomers: 347,
    totalProducts: 1284,
    inventoryItems: 18420,
    inventoryValue: 3928600,
    lowStockItems: 23,
    pendingPurchaseOrders: 8,
  },

  salesTrend: [
    { month: "Jan", revenue: 185000, orders: 62 },
    { month: "Feb", revenue: 214500, orders: 74 },
    { month: "Mar", revenue: 267800, orders: 86 },
    { month: "Apr", revenue: 312300, orders: 95 },
    { month: "May", revenue: 356200, orders: 108 },
    { month: "Jun", revenue: 401700, orders: 122 },
    { month: "Jul", revenue: 470000, orders: 139 },
  ],

  inventoryCategories: [
    {
      category: "Electronics",
      value: 1520000,
      items: 542,
    },
    {
      category: "Accessories",
      value: 462000,
      items: 318,
    },
    {
      category: "Home Appliances",
      value: 825000,
      items: 194,
    },
    {
      category: "Gaming",
      value: 611000,
      items: 230,
    },
    {
      category: "Office Supplies",
      value: 510600,
      items: 427,
    },
  ],

  topProducts: [
    {
      id: "1",
      name: "iPhone 16 Pro",
      sku: "APL-IP16P",
      quantitySold: 185,
      revenue: 240500,
    },
    {
      id: "2",
      name: "Samsung Galaxy S26",
      sku: "SAM-S26",
      quantitySold: 172,
      revenue: 221300,
    },
    {
      id: "3",
      name: "MacBook Air M5",
      sku: "APL-MBA-M5",
      quantitySold: 91,
      revenue: 191100,
    },
    {
      id: "4",
      name: 'Dell XPS 15"',
      sku: "DEL-XPS15",
      quantitySold: 78,
      revenue: 165800,
    },
    {
      id: "5",
      name: "Sony WH-1000XM6",
      sku: "SNY-XM6",
      quantitySold: 203,
      revenue: 121700,
    },
  ],

  lowStockItems: [
    {
      id: "1",
      name: "Logitech MX Master 4",
      sku: "LOG-MX4",
      currentStock: 3,
      reorderLevel: 15,
    },
    {
      id: "2",
      name: "Canon PIXMA Ink",
      sku: "CAN-INK",
      currentStock: 6,
      reorderLevel: 25,
    },
    {
      id: "3",
      name: "HDMI Cable 2m",
      sku: "HDMI-2M",
      currentStock: 8,
      reorderLevel: 40,
    },
    {
      id: "4",
      name: "Gaming Keyboard RGB",
      sku: "KEY-RGB",
      currentStock: 5,
      reorderLevel: 20,
    },
    {
      id: "5",
      name: "USB-C Charger 65W",
      sku: "CHR-65W",
      currentStock: 4,
      reorderLevel: 18,
    },
  ],

  recentSales: [
    {
      id: "1",
      invoiceNumber: "INV-2026-1001",
      customer: "John Smith",
      amount: 1499,
      status: "PAID",
      createdAt: "2026-07-29T09:15:00Z",
    },
    {
      id: "2",
      invoiceNumber: "INV-2026-1002",
      customer: "Alice Johnson",
      amount: 899,
      status: "PAID",
      createdAt: "2026-07-29T09:48:00Z",
    },
    {
      id: "3",
      invoiceNumber: "INV-2026-1003",
      customer: "Michael Brown",
      amount: 420,
      status: "PENDING",
      createdAt: "2026-07-29T10:02:00Z",
    },
    {
      id: "4",
      invoiceNumber: "INV-2026-1004",
      customer: "Emily Davis",
      amount: 2360,
      status: "PARTIALLY_PAID",
      createdAt: "2026-07-29T10:20:00Z",
    },
    {
      id: "5",
      invoiceNumber: "INV-2026-1005",
      customer: "David Wilson",
      amount: 125,
      status: "PAID",
      createdAt: "2026-07-29T10:42:00Z",
    },
  ],
};
