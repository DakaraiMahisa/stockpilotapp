import { Button } from "@/components/ui/index";
import EmptyState from "@/components/feedback/EmptyState";

interface BranchEmptyStateProps {
  onCreateBranch: () => void;
}

const BranchEmptyState = ({ onCreateBranch }: BranchEmptyStateProps) => {
  return (
    <EmptyState
      title="No branches found"
      description="Create your first branch to start managing your organization's locations."
      action={
        <Button variant="primary" onClick={onCreateBranch}>
          Create Branch
        </Button>
      }
    />
  );
};

export default BranchEmptyState;
