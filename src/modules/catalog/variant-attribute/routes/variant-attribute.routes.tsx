import ProtectedRoute from "@/modules/identity/auth/guards/ProtectedRoute";
import { PERMISSIONS } from "@/constants/permissions";
import VariantAttributeManagePage from "../pages/VariantAttributeManagePage";

export const variantAttributesRoutes = [
  {
    element: <ProtectedRoute requiredPermission={PERMISSIONS.PRODUCT_READ} />,
    children: [
      {
        path: "/catalog/variant-attributes",
        element: <VariantAttributeManagePage />,
      },
    ],
  },
];
