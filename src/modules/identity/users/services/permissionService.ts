import apiClient from "@/lib/apiClient";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const fetchCurrentUserPermissions = async (): Promise<string[]> => {
  const response = await apiClient.get<ApiResponse<string[]>>(
    "/api/v1/users/me/permissions",
  );

  return response.data.data;
};
