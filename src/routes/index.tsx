import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "@/modules/identity/auth/guards/ProtectedRoute";

import { identityRoutes } from "@/modules/identity/routes";
import { orgRoutes } from "@/modules/org/routes";

import { PERMISSIONS } from "@/constants/permissions";
export const router = createBrowserRouter([
  ...identityRoutes.auth,

  {
    element: <ProtectedRoute />,
    children: [
      ...identityRoutes.authenticated,
      ...identityRoutes.profile,
      ...orgRoutes,
    ],
  },

  {
    element: <ProtectedRoute requiredPermission={PERMISSIONS.USERS_READ} />,
    children: identityRoutes.users,
  },
]);
