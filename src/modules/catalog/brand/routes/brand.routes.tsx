import ProtectedRoute from "@/modules/identity/auth/guards/ProtectedRoute";
import { PERMISSIONS } from "@/constants/permissions";

import BrandManagePage from "../pages/BrandManagePage";

export const brandRoutes = [
  {
    element: <ProtectedRoute requiredPermission={PERMISSIONS.BRAND_READ} />,
    children: [
      {
        path: "/catalog/brands",
        element: <BrandManagePage />,
      },
    ],
  },
];
