import type { UserSummary } from "./user.types";

export interface UserPage {
  content: UserSummary[];

  totalElements: number;
  totalPages: number;

  size: number;
  number: number;

  first: boolean;
  last: boolean;

  empty: boolean;
}
