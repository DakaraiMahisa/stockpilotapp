import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import authClient from "./authClient";
import { fetchCsrfToken, getCsrfToken } from "./csrf";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let refreshPromise: Promise<string | null> | null = null;

const MUTATING_METHODS = ["post", "put", "patch", "delete"];

const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const { refreshToken } = useAuthStore.getState();

      if (!refreshToken) {
        return null;
      }

      let csrfToken = getCsrfToken();

      if (!csrfToken) {
        csrfToken = await fetchCsrfToken(authClient);
      }

      if (!csrfToken) {
        return null;
      }

      const response = await authClient.post(
        "/api/v1/auth/refresh/public",
        { refreshToken },
        {
          headers: {
            "X-XSRF-TOKEN": csrfToken,
          },
        },
      );

      const tokens = response.data.data;

      useAuthStore
        .getState()
        .setTokens(tokens.accessToken, tokens.refreshToken);

      return tokens.accessToken;
    } catch {
      useAuthStore.getState().clearTokens();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

apiClient.interceptors.request.use(async (config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (MUTATING_METHODS.includes(config.method?.toLowerCase() ?? "")) {
    let csrfToken = getCsrfToken();

    if (!csrfToken) {
      csrfToken = await fetchCsrfToken(authClient);
    }

    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /*
     * CSRF retry
     */
    if (
      (error.response?.status === 403 &&
        error.response?.data?.code === "CSRF_TOKEN_MISSING") ||
      (error.response?.data?.code === "CSRF_TOKEN_INVALID" &&
        !originalRequest._csrfRetry)
    ) {
      originalRequest._csrfRetry = true;

      const csrfToken = await fetchCsrfToken(authClient);

      if (csrfToken) {
        originalRequest.headers["X-XSRF-TOKEN"] = csrfToken;

        return apiClient(originalRequest);
      }
    }

    /*
     * Access token refresh
     */
    const hasAccessToken = Boolean(useAuthStore.getState().accessToken);

    if (
      error.response?.status === 401 &&
      hasAccessToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return apiClient(originalRequest);
      }

      useAuthStore.getState().clearTokens();

      window.location.href = "/login";

      return Promise.reject(
        new Error("Your session has expired. Please sign in again."),
      );
    }

    /*
     * Normalize API error message
     */
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      "Something went wrong. Please try again.";

    error.message = message;

    return Promise.reject(error);
  },
);

export default apiClient;
