import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let refreshPromise: Promise<string | null> | null = null;

const getCsrfToken = (): string | undefined => {
  const raw = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
  return raw ? decodeURIComponent(raw) : undefined;
};

const fetchCsrfToken = async (): Promise<string | undefined> => {
  await apiClient.get("/api/csrf-token/public");
  return getCsrfToken();
};

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

      const response = await apiClient.post(
        "/api/v1/auth/refresh",
        { refreshToken },
        {
          headers: {
            "X-Skip-Refresh": "true",
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

const MUTATING_METHODS = ["post", "put", "patch", "delete"];

apiClient.interceptors.request.use(async (config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (MUTATING_METHODS.includes(config.method?.toLowerCase() ?? "")) {
    let token = getCsrfToken();

    if (!token) {
      token = await fetchCsrfToken();
    }

    if (token) {
      config.headers["X-XSRF-TOKEN"] = token;
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

    if (originalRequest.headers?.["X-Skip-Refresh"]) {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 403 &&
        error.response?.data?.code === "CSRF_TOKEN_MISSING") ||
      (error.response?.data?.code === "CSRF_TOKEN_INVALID" &&
        !originalRequest._csrfRetry)
    ) {
      originalRequest._csrfRetry = true;

      const token = await fetchCsrfToken();

      if (token) {
        originalRequest.headers["X-XSRF-TOKEN"] = token;

        return apiClient(originalRequest);
      }
    }
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

    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      "Something went wrong. Please try again.";

    error.message = message;
    return Promise.reject(error);
  },
);

export default apiClient;
