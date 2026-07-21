import { useState } from "react";

import { Button, Modal, Select, Textarea } from "@/components/ui";

import type {
  SubscriptionUpgradeRequest,
  PlanCode,
  UpgradePlan,
} from "../../types/subscription";

interface UpgradeDialogProps {
  open: boolean;
  loading?: boolean;
  currentPlan: PlanCode;
  onClose: () => void;
  onSubmit: (request: SubscriptionUpgradeRequest) => void;
}

const PLAN_OPTIONS = [
  {
    label: "Basic",
    value: "BASIC",
  },
  {
    label: "Professional",
    value: "PROFESSIONAL",
  },
  {
    label: "Enterprise",
    value: "ENTERPRISE",
  },
];

const UpgradeDialog = ({
  open,
  loading = false,
  currentPlan,
  onClose,
  onSubmit,
}: UpgradeDialogProps) => {
  const [selectedPlan, setSelectedPlan] = useState<UpgradePlan | "">("");

  const [notes, setNotes] = useState("");

  const handleClose = () => {
    setSelectedPlan("");
    setNotes("");
    onClose();
  };

  const handleSubmit = () => {
    if (!selectedPlan) {
      return;
    }
    onSubmit({
      requestedPlan: selectedPlan,
      notes: notes.trim() || undefined,
    });

    setSelectedPlan("");
    setNotes("");
  };

  return (
    <Modal
      open={open}
      title="Request Plan Upgrade"
      description="Choose the plan you would like to upgrade to. Our team will review your request and contact you."
      size="md"
      onClose={handleClose}
    >
      <div className="space-y-6">
        <Select
          label="Requested Plan"
          value={selectedPlan}
          options={PLAN_OPTIONS.filter((plan) => plan.value !== currentPlan)}
          placeholder="Select a plan"
          onChange={(value) => setSelectedPlan(value as UpgradePlan)}
        />

        <Textarea
          rows={5}
          maxLength={500}
          placeholder="Tell us anything that may help us process your request..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            loading={loading}
            disabled={!selectedPlan}
            onClick={handleSubmit}
          >
            Submit Request
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpgradeDialog;
