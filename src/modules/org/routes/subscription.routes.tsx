import SubscriptionPage from "../pages/SubscriptionPage";
import ProtectedRoute from "@/modules/identity/auth/guards/ProtectedRoute";
import { PERMISSIONS } from "@/constants/permissions";
export const subscriptionRoutes = [
  {
    element: (
      <ProtectedRoute requiredPermission={PERMISSIONS.SUBSCRIPTION_READ} />
    ),
    children: [
      {
        path: "/organization/subscription",
        element: <SubscriptionPage />,
      },
    ],
  },
];
