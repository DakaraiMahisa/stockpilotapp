import apiClient from "./apiClient";

export const initializeCsrf = async (): Promise<void> => {
  await apiClient.get("/api/csrf-token/public");
};
