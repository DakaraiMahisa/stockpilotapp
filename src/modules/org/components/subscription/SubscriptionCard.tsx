import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";

import { getSubscriptionStatusVariant } from "../../utils/subscriptionBadge";
import type { SubscriptionDto } from "../../types/subscription";

interface SubscriptionCardProps {
  subscription: SubscriptionDto;
  onUpgrade: () => void;
}

const formatDate = (date?: string | null) => {
  if (!date) {
    return "—";
  }

  return new Date(date).toLocaleDateString();
};

const SubscriptionCard = ({
  subscription,
  onUpgrade,
}: SubscriptionCardProps) => {
  const expiry = subscription.planExpiresAt ?? subscription.trialEndsAt;
  const { hasPermission } = usePermissions();

  const canUpgrade = hasPermission(PERMISSIONS.SUBSCRIPTION_UPGRADE);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Plan</p>

            <h2 className="mt-1 text-3xl font-bold">{subscription.planCode}</h2>
          </div>

          <Badge variant={getSubscriptionStatusVariant(subscription.status)}>
            {subscription.status}
          </Badge>

          <div className="space-y-1 text-sm">
            <div className="flex gap-2">
              <span className="font-medium">Started:</span>

              <span className="text-muted-foreground">
                {formatDate(subscription.planStartedAt)}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="font-medium">Expires:</span>

              <span className="text-muted-foreground">
                {formatDate(expiry)}
              </span>
            </div>
          </div>
        </div>

        {canUpgrade && (
          <Button onClick={onUpgrade} disabled={!subscription.active}>
            Upgrade Plan
          </Button>
        )}
      </div>
    </Card>
  );
};

export default SubscriptionCard;
