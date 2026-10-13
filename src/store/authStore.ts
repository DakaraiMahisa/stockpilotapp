import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  user_id: string;
  tenantId: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  tenantId: string | null;
  isAuthenticated: boolean;

  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      userId: null,
      tenantId: null,
      isAuthenticated: false,

      setTokens: (accessToken, refreshToken) => {
        const payload = jwtDecode<JwtPayload>(accessToken);

        set({
          accessToken,
          refreshToken,
          userId: payload.user_id,
          tenantId: payload.tenantId,
          isAuthenticated: true,
        });
      },

      clearTokens: () =>
        set({
          accessToken: null,
          refreshToken: null,
          userId: null,
          tenantId: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userId: state.userId,
        tenantId: state.tenantId,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
