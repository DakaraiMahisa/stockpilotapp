import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "@/modules/identity/auth/guards/ProtectedRoute";

import {
  authRoutes,
  authenticatedRoutes,
} from "@/modules/identity/routes/auth.routes";

import {
  profileRoutes,
  userManagementRoutes,
} from "@/modules/identity/routes/user.routes";

import { organizationRoutes } from "@/modules/org/routes/organization.routes";
import { branchRoutes } from "@/modules/org/routes/branch.routes";
import { PERMISSIONS } from "@/constants/permissions";
export const router = createBrowserRouter([
  ...authRoutes,

  {
    element: <ProtectedRoute />,
    children: [
      ...authenticatedRoutes,
      ...profileRoutes,
      ...organizationRoutes,
      ...branchRoutes,
    ],
  },

  {
    element: <ProtectedRoute requiredPermission={PERMISSIONS.USERS_READ} />,
    children: userManagementRoutes,
  },
]);
