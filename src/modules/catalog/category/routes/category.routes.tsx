import ProtectedRoute from "@/modules/identity/auth/guards/ProtectedRoute";
import { PERMISSIONS } from "@/constants/permissions";

import CategoryManagePage from "../pages/CategoryManagePage";

export const categoryRoutes = [
  {
    element: <ProtectedRoute requiredPermission={PERMISSIONS.CATEGORY_READ} />,
    children: [
      {
        path: "/catalog/categories",
        element: <CategoryManagePage />,
      },
    ],
  },
];
