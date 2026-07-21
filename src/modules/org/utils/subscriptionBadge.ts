import type { SubscriptionStatus } from "../types/subscription";

type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

export function getSubscriptionStatusVariant(
  status: SubscriptionStatus,
): BadgeVariant {
  switch (status) {
    case "ACTIVE":
      return "default";

    case "TRIAL":
      return "secondary";

    case "EXPIRED":
      return "destructive";

    case "SUSPENDED":
      return "outline";

    default:
      return "ghost";
  }
}
