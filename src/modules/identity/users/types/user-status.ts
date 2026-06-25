export const USER_STATUS = {
  INVITED: "INVITED",
  ACTIVE: "ACTIVE",
  DEACTIVATED: "DEACTIVATED",
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
