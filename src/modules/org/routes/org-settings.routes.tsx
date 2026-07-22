import ProtectedRoute from "@/modules/identity/auth/guards/ProtectedRoute";
import { PERMISSIONS } from "@/constants/permissions";

import OrgSettingsPage from "../pages/OrgSettingsPage";

export const org_settingsRoutes = [
  {
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.ORG_SETTINGS_READ} />
    ),
    children: [
      {
        path: "/organization/settings",
        element: <OrgSettingsPage />,
      },
    ],
  },
];
