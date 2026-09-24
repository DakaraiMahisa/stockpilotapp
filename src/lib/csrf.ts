import type { AxiosInstance } from "axios";

export const getCsrfToken = (): string | undefined => {
  const prefix = "XSRF-TOKEN=";

  const cookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix));

  if (!cookie) {
    return undefined;
  }

  return decodeURIComponent(cookie.slice(prefix.length));
};

export const fetchCsrfToken = async (
  client: AxiosInstance,
): Promise<string | undefined> => {
  await client.get("/api/csrf-token/public");

  return getCsrfToken();
};
