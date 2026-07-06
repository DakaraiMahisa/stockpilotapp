import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui";

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
      <div>
        <h1 className="text-2xl font-semibold">Create Branch</h1>

        <p className="text-gray-500">Add a new branch to your organization.</p>
      </div>

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
