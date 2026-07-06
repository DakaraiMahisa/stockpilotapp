import { useNavigate, useParams } from "react-router-dom";

import { Card } from "@/components/ui";

import BranchForm from "../components/forms/BranchForm";
import BranchSkeleton from "../components/branch/BranchSkeleton";
import { useBranch } from "../hooks/useBranch";
import { useUpdateBranch } from "../hooks/useUpdateBranch";

const EditBranchPage = () => {
  const { id = "" } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useBranch(id);

  const updateBranch = useUpdateBranch();

  if (isLoading) {
    return <BranchSkeleton />;
  }

  const branch = data?.data;

  if (!branch) {
    return <Card className="p-8">Branch not found.</Card>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Branch</h1>

        <p className="text-gray-500">Update branch information.</p>
      </div>

      <Card>
        <BranchForm
          mode="edit"
          initialValues={{
            name: branch.name,
            code: branch.code,
            branchType: branch.branchType,
            phone: branch.phone,
            email: branch.email,
            addressLine1: branch.addressLine1,
            city: branch.city,
            managerId: branch.manager?.id,
          }}
          isSubmitting={updateBranch.isPending}
          onSubmit={(values) =>
            updateBranch
              .mutateAsync({
                id,
                request: values,
              })
              .then(() => navigate("/organization/branches"))
          }
          onCancel={() => navigate("/organization/branches")}
        />
      </Card>
    </div>
  );
};

export default EditBranchPage;
