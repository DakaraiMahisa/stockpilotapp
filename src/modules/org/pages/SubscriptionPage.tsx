import { useState } from "react";

import { EmptyState, Skeleton } from "@/components/feedback";
import { PageHeader } from "@/components/common";
import {
  useSubscription,
  useSubmitUpgradeRequest,
} from "../hooks/useSubscription";

import SubscriptionCard from "../components/subscription/SubscriptionCard";
import UsageCard from "../components/subscription/UsageCard";
import UpgradeDialog from "../components/subscription/UpgradeDialog";

const SubscriptionPage = () => {
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const { data, isLoading, isError } = useSubscription();

  const upgradeMutation = useSubmitUpgradeRequest();

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (isError || !data?.data) {
    return (
      <EmptyState
        title="Unable to load subscription"
        description="Please refresh the page or try again later."
      />
    );
  }

  const subscription = data.data;

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Subscription"
          description="View your subscription plan, resource usage, and request upgrades."
        />

        <SubscriptionCard
          subscription={subscription}
          onUpgrade={() => setUpgradeOpen(true)}
        />

        {subscription.usage && (
          <UsageCard usage={subscription.usage} limits={subscription.limits} />
        )}
      </div>

      <UpgradeDialog
        open={upgradeOpen}
        loading={upgradeMutation.isPending}
        currentPlan={subscription.planCode}
        onClose={() => setUpgradeOpen(false)}
        onSubmit={(request) => {
          upgradeMutation.mutate(request, {
            onSuccess: () => {
              setUpgradeOpen(false);
            },
          });
        }}
      />
    </>
  );
};

export default SubscriptionPage;
