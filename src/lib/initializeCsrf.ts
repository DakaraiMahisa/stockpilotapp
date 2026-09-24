import authClient from "./authClient";
import { fetchCsrfToken } from "./csrf";

export const initializeCsrf = async (): Promise<void> => {
  await fetchCsrfToken(authClient);
};
