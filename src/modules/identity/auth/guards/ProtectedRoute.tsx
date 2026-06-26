import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  requiredPermission?: string;
}

const ProtectedRoute = ({ requiredPermission }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const permissions = useAuthStore((state) => state.permissions);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !permissions.includes(requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
