import { type UserStatus } from "./user-status";

export interface UserSummary {
  id: string;

  firstName: string;
  lastName: string;

  email: string;

  role: string;

  status: UserStatus;

  active: boolean;

  lastLoginAt: string | null;
}
