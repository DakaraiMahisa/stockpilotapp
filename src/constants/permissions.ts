export const PERMISSIONS = {
  // =========================
  // Users
  // =========================
  USERS_READ: "users:read",
  USERS_CREATE: "users:create",
  USERS_UPDATE: "users:update",
  USERS_DELETE: "users:delete",
  USERS_ACTIVATE: "users:activate",
  USERS_DEACTIVATE: "users:deactivate",
  USERS_INVITE: "users:invite",

  // =========================
  // Roles & Sessions
  // =========================
  ROLES_READ: "roles:read",
  ROLES_UPDATE: "roles:update",

  SESSIONS_READ: "sessions:read",
  SESSIONS_REVOKE: "sessions:revoke",

  // =========================
  // Organization
  // =========================
  ORGANIZATION_READ: "organization:read",
  ORGANIZATION_UPDATE: "organization:update",

  // =========================
  // Branches
  // =========================
  BRANCHES_READ: "branches:read",
  BRANCHES_CREATE: "branches:create",
  BRANCHES_UPDATE: "branches:update",
  BRANCHES_UPDATE_STATUS: "branches:update-status",
  BRANCHES_SET_DEFAULT: "branches:set-default",

  // =========================
  // Tax
  // =========================
  TAX_CONFIG_READ: "tax:read",
  TAX_CONFIG_CREATE: "tax:create",
  TAX_CONFIG_UPDATE: "tax:update",
  TAX_CONFIG_RESOLVE: "tax:resolve",
  TAX_CONFIG_SET_DEFAULT: "tax:set-default",

  // =========================
  // Inventory
  // =========================
  INVENTORY_READ: "inventory:read",
  INVENTORY_CREATE: "inventory:create",
  INVENTORY_UPDATE: "inventory:update",
  INVENTORY_DELETE: "inventory:delete",

  // =========================
  // Products
  // =========================
  PRODUCTS_READ: "products:read",
  PRODUCTS_CREATE: "products:create",
  PRODUCTS_UPDATE: "products:update",
  PRODUCTS_DELETE: "products:delete",

  // =========================
  // Categories
  // =========================
  CATEGORIES_READ: "categories:read",
  CATEGORIES_CREATE: "categories:create",
  CATEGORIES_UPDATE: "categories:update",
  CATEGORIES_DELETE: "categories:delete",

  // =========================
  // Suppliers
  // =========================
  SUPPLIERS_READ: "suppliers:read",
  SUPPLIERS_CREATE: "suppliers:create",
  SUPPLIERS_UPDATE: "suppliers:update",
  SUPPLIERS_DELETE: "suppliers:delete",

  // =========================
  // Purchases
  // =========================
  PURCHASES_READ: "purchases:read",
  PURCHASES_CREATE: "purchases:create",
  PURCHASES_UPDATE: "purchases:update",
  PURCHASES_APPROVE: "purchases:approve",

  // =========================
  // Sales
  // =========================
  SALES_READ: "sales:read",
  SALES_CREATE: "sales:create",
  SALES_UPDATE: "sales:update",
  SALES_REFUND: "sales:refund",

  // =========================
  // Reports
  // =========================
  REPORTS_READ: "reports:read",
  REPORTS_EXPORT: "reports:export",

  // =========================
  // Settings
  // =========================
  SETTINGS_READ: "settings:read",
  SETTINGS_UPDATE: "settings:update",

  // =========================
  // Business Configuration
  // =========================
  BUSINESS_CONFIG_READ: "business-config:read",
  BUSINESS_CONFIG_UPDATE: "business-config:update",

  // =========================
  // SUBSCRIPTION PLAN
  // =========================
  SUBSCRIPTION_READ: "subscription:read",
  SUBSCRIPTION_UPGRADE: "subscription:upgrade",

  // =========================
  // ORGANIZATION SETTINGS
  // =========================
  ORG_SETTINGS_READ: "settings:read",
  ORG_SETTINGS_UPDATE_PASSWORD_POLICY: "settings:update-password-policy",
  ORG_SETTINGS_UPDATE_SESSION_POLICY: "settings:update-session-policy",
  ORG_SETTINGS_UPDATE_INVITE_POLICY: "settings:update-invite-policy",
  ORG_SETTINGS_UPDATE_GENERAL: "settings:update-general",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
