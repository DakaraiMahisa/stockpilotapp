import axios from "axios";

interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const data = error.response?.data;

    if (data?.errors?.length) {
      return data.errors.join("\n");
    }

    return data?.message ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
};
