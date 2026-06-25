import apiClient from "@/lib/apiClient";

import { type PageResponse } from "@/types/pagination";

import { type UserSummary } from "../types/user.types";

export interface GetUsersParams {
  page?: number;
  size?: number;

  roleId?: string;

  active?: boolean;
}

export const getUsers = async (
  params: GetUsersParams,
): Promise<PageResponse<UserSummary>> => {
  const response = await apiClient.get("/api/v1/users", {
    params,
  });

  return response.data;
};
