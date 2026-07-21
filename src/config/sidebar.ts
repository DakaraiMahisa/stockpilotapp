import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  FileBarChart,
  Building2,
  Building,
  Boxes,
  Package,
  Tags,
  Truck,
  PackageSearch,
  ShoppingCart,
  Users,
  CircleUser,
  BadgeDollarSign,
  UserCog,
  Shield,
  Settings,
  User,
  LayoutDashboard,
  CreditCard,
  SlidersHorizontal,
} from "lucide-react";

import { PERMISSIONS } from "@/constants/permissions";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  permission?: string;
  badge?: string;
}

export interface SidebarGroup {
  label: string;
  icon: LucideIcon;
  children: SidebarItem[];
}

export type SidebarSection =
  | {
      type: "item";
      item: SidebarItem;
    }
  | {
      type: "group";
      group: SidebarGroup;
    };

export const SIDEBAR: SidebarSection[] = [
  {
    type: "item",
    item: {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
  },

  {
    type: "group",
    group: {
      label: "Operations",
      icon: Boxes,
      children: [
        {
          label: "Inventory",
          href: "/inventory",
          icon: Boxes,
          permission: PERMISSIONS.INVENTORY_READ,
        },
        {
          label: "Sales",
          href: "/sales",
          icon: BadgeDollarSign,
          permission: PERMISSIONS.SALES_READ,
        },
        {
          label: "Purchases",
          href: "/purchases",
          icon: ShoppingCart,
          permission: PERMISSIONS.PURCHASES_READ,
        },
        {
          label: "Customers",
          href: "/customers",
          icon: Users,
        },
      ],
    },
  },

  {
    type: "group",
    group: {
      label: "Catalog",
      icon: PackageSearch,
      children: [
        {
          label: "Products",
          href: "/products",
          icon: Package,
          permission: PERMISSIONS.PRODUCTS_READ,
        },
        {
          label: "Categories",
          href: "/categories",
          icon: Tags,
          permission: PERMISSIONS.CATEGORIES_READ,
        },
        {
          label: "Suppliers",
          href: "/suppliers",
          icon: Truck,
          permission: PERMISSIONS.SUPPLIERS_READ,
        },
      ],
    },
  },

  {
    type: "group",
    group: {
      label: "Administration",
      icon: Building2,
      children: [
        {
          label: "Organization",
          href: "/organization",
          icon: Building2,
          permission: PERMISSIONS.ORGANIZATION_READ,
        },
        {
          label: "Business Configuration",
          href: "/organization/business-config",
          icon: Settings,
          permission: PERMISSIONS.BUSINESS_CONFIG_READ,
        },
        {
          label: "Branches",
          href: "/organization/branches",
          icon: Building,
          permission: PERMISSIONS.BRANCHES_READ,
        },
        {
          label: "Tax Management",
          href: "/organization/taxes",
          icon: BadgeDollarSign,
          permission: PERMISSIONS.TAX_CONFIG_READ,
        },
        {
          label: "Subscription",
          href: "/organization/subscription",
          icon: CreditCard,
          permission: PERMISSIONS.SUBSCRIPTION_READ,
        },
        {
          label: "Organization Settings",
          href: "/organization/settings",
          icon: SlidersHorizontal,
          permission: PERMISSIONS.ORG_SETTINGS_READ,
        },
        {
          label: "Users",
          href: "/users",
          icon: UserCog,
          permission: PERMISSIONS.USERS_READ,
        },
        {
          label: "Roles",
          href: "/roles",
          icon: Shield,
          permission: PERMISSIONS.ROLES_READ,
        },
      ],
    },
  },

  {
    type: "group",
    group: {
      label: "Analytics",
      icon: BarChart3,
      children: [
        {
          label: "Reports",
          href: "/reports",
          icon: FileBarChart,
          permission: PERMISSIONS.REPORTS_READ,
        },
      ],
    },
  },

  {
    type: "group",
    group: {
      label: "Account",
      icon: CircleUser,
      children: [
        {
          label: "Profile",
          href: "/profile",
          icon: User,
        },
        {
          label: "Settings",
          href: "/settings",
          icon: Settings,
          permission: PERMISSIONS.SETTINGS_READ,
        },
      ],
    },
  },
];
