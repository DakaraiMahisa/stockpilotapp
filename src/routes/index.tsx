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

export const router = createBrowserRouter([
  ...authRoutes,

  {
    element: <ProtectedRoute />,
    children: [...authenticatedRoutes, ...profileRoutes, ...organizationRoutes],
  },

  {
    element: <ProtectedRoute requiredPermission="users:read" />,
    children: userManagementRoutes,
  },
]);
