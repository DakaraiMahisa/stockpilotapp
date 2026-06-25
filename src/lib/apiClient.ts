import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

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

    return Promise.reject(error);
  },
);

export default apiClient;
