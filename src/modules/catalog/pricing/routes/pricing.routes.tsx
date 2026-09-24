import ProtectedRoute from "@/modules/identity/auth/guards/ProtectedRoute";
import { PERMISSIONS } from "@/constants/permissions";
import PricingPage from "../pages/PricingPage";

export const pricingRoutes = [
  {
    element: <ProtectedRoute requiredPermission={PERMISSIONS.PRODUCT_READ} />,
    children: [
      {
        path: "/catalog/pricing",
        element: <PricingPage />,
      },
    ],
  },
];
