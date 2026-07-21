export const PLAN_CODES = ["TRIAL", "BASIC", "PROFESSIONAL"] as const;

export type PlanCode = (typeof PLAN_CODES)[number];

export const SUBSCRIPTION_STATUSES = [
  "TRIAL",
  "ACTIVE",
  "EXPIRED",
  "SUSPENDED",
] as const;

export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export const UPGRADE_PLANS = ["BASIC", "PROFESSIONAL"] as const;

export type UpgradePlan = (typeof UPGRADE_PLANS)[number];

export interface SubscriptionUsageDto {
  users: number;
  branches: number;
  skus: number;
}

export interface SubscriptionLimitsDto {
  maxUsers: number;
  maxBranches: number;
  maxSkus: number;
}

export interface SubscriptionDto {
  planCode: PlanCode;
  status: SubscriptionStatus;

  planStartedAt: string;
  trialEndsAt: string | null;
  planExpiresAt: string | null;

  active: boolean;

  usage: SubscriptionUsageDto;
  limits: SubscriptionLimitsDto;
}

export interface SubscriptionUpgradeRequest {
  requestedPlan: UpgradePlan;
  notes?: string;
}

export interface UpgradeRequestResponse {
  requestId: string;
  message: string;
}
