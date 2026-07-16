import { Button } from "@/components/ui";
import EmptyState from "@/components/feedback/EmptyState";

interface TaxEmptyStateProps {
  onCreateTaxClass: () => void;
}

const TaxEmptyState = ({ onCreateTaxClass }: TaxEmptyStateProps) => {
  return (
    <EmptyState
      title="No tax classes found"
      description="Create your first tax class to configure taxes for products and transactions."
      action={
        <Button variant="primary" onClick={onCreateTaxClass}>
          Create Tax Class
        </Button>
      }
    />
  );
};

export default TaxEmptyState;
