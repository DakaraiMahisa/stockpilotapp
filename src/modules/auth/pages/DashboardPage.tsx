import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/modules/auth/hooks/useLogout";

const DashboardPage = () => {
  const navigate = useNavigate();

  const clearTokens = useAuthStore((state) => state.clearTokens);

  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    } finally {
      clearTokens();
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleLogout} disabled={logoutMutation.isPending}>
        {logoutMutation.isPending ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default DashboardPage;
