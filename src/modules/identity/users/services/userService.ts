import apiClient from "@/lib/apiClient";

import type { UserDetails } from "../types/user-details";
import type { UserPage } from "../types/user-page";
import type { UserQueryParams } from "../types/user-query-params";

export const listUsers = async (params: UserQueryParams): Promise<UserPage> => {
  const response = await apiClient.get("/api/v1/users", {
    params,
  });

  return response.data;
};

export const getUser = async (id: string): Promise<UserDetails> => {
  const response = await apiClient.get(`/api/v1/users/${id}`);

  return response.data;
};

export const changeUserRole = async (
  userId: string,
  roleId: string,
): Promise<void> => {
  await apiClient.patch(`/api/v1/users/${userId}/role`, {
    roleId,
  });
};
