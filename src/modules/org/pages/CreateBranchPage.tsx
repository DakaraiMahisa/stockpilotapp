import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui";
import { PageHeader } from "@/components/common";
import BranchForm from "../components/forms/BranchForm";
import { useCreateBranch } from "../hooks/useCreateBranch";
import type { BranchFormValues } from "../components/forms/branchFormSchema";

const CreateBranchPage = () => {
  const navigate = useNavigate();

  const createBranch = useCreateBranch();

  const handleSubmit = async (values: BranchFormValues) => {
    await createBranch.mutateAsync(values);

    navigate("/organization/branches");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Branch"
        description="Add a new branch to your organization."
      />

      <Card>
        <BranchForm
          mode="create"
          isSubmitting={createBranch.isPending}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/organization/branches")}
        />
      </Card>
    </div>
  );
};

export default CreateBranchPage;
