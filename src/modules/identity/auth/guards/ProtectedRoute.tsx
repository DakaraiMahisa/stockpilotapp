import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { usePermissions } from "@/hooks/usePermissions";

interface ProtectedRouteProps {
  requiredPermission?: string;
}

const ProtectedRoute = ({ requiredPermission }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { hasPermission, isLoading, isError, refetch } = usePermissions();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <div>Loading permissions...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>Unable to load your permissions.</p>
        <button onClick={() => void refetch()}>Retry</button>
      </div>
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
