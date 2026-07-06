import BranchListPage from "../pages/BranchListPage";
import CreateBranchPage from "../pages/CreateBranchPage";
import EditBranchPage from "../pages/EditBranchPage";

export const branchRoutes = [
  {
    path: "/organization/branches",
    element: <BranchListPage />,
  },
  {
    path: "/organization/branches/new",
    element: <CreateBranchPage />,
  },
  {
    path: "/organization/branches/:id/edit",
    element: <EditBranchPage />,
  },
];
