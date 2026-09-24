import ProtectedRoute from "@/modules/identity/auth/guards/ProtectedRoute";
import { PERMISSIONS } from "@/constants/permissions";
import ProductManagePage from "../pages/ProductManagePage";

export const productRoutes = [
  {
    element: <ProtectedRoute requiredPermission={PERMISSIONS.PRODUCT_READ} />,
    children: [
      {
        path: "/catalog/products",
        element: <ProductManagePage />,
      },
    ],
  },
];
