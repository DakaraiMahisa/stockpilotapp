import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/modules/identity/auth/hooks/useLogout";

const UserMenu = () => {
  const navigate = useNavigate();

  const clearTokens = useAuthStore((state) => state.clearTokens);

  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearTokens();
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </button>
  );
};

export default UserMenu;
