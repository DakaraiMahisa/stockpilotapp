import apiClient from "@/lib/apiClient";

import type { Role } from "../types/role";

export const getRoles = async (): Promise<Role[]> => {
  const response = await apiClient.get("/api/v1/roles");

  return response.data;
};
