import apiClient from "@/lib/apiClient";
import { type PageResponse } from "@/types/pagination";

import { type UserSummary } from "../types/user.types";
import type { UserDetails } from "../types/user-details";
import type { UserPage } from "../types/user-page";
import type { UserQueryParams } from "../types/user-query-params";

import type { InviteUserRequest } from "../types/invite-user-request";
import type { UserSession } from "../types/user-session";

export const listUsers = async (params: UserQueryParams): Promise<UserPage> => {
  const response = await apiClient.get("/api/v1/users", {
    params,
  });

  return response.data.data;
};

export const getUser = async (id: string): Promise<UserDetails> => {
  const response = await apiClient.get(`/api/v1/users/${id}`);

  return response.data.data;
};

export const changeUserRole = async (
  userId: string,
  roleId: string,
): Promise<void> => {
  await apiClient.patch(`/api/v1/users/${userId}/role`, {
    roleId,
  });
};

export const inviteUser = async (payload: InviteUserRequest): Promise<void> => {
  await apiClient.post("/api/v1/users/invite", payload);
};

export const getCurrentUser = async () => {
  const response = await apiClient.get("/api/v1/users/me");

  return response.data.data;
};

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

  return response.data.data;
};

export const getUserSessions = async (
  userId: string,
): Promise<UserSession[]> => {
  const response = await apiClient.get(`/api/v1/users/${userId}/sessions`);

  return response.data.data;
};

export const revokeSession = async (
  userId: string,
  sessionId: string,
): Promise<void> => {
  await apiClient.delete(`/api/v1/users/${userId}/sessions/${sessionId}`);
};

export const activateUser = async (userId: string): Promise<void> => {
  await apiClient.patch(`/api/v1/users/${userId}/activate`);
};

export const deactivateUser = async (userId: string): Promise<void> => {
  await apiClient.patch(`/api/v1/users/${userId}/deactivate`);
};
