import type { UserStatus } from "./user-status";

export interface UserDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permissions: string[];
  status: UserStatus;
  active: boolean;
  emailVerified: boolean;
  mfaEnabled: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}
