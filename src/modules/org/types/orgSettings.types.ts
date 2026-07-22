export const LANGUAGE_CODES = [
  "en-US",
  "en-GB",
  "fr-FR",
  "de-DE",
  "es-ES",
  "zh-Hans",
  "zh-Hant",
] as const;

export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export interface PasswordPolicyDto {
  minPasswordLength: number;
  requireUppercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  passwordExpiryDays: number;
  maxLoginAttempts: number;
  lockoutDurationMins: number;
}

export interface SessionPolicyDto {
  sessionTimeoutMins: number;
  maxConcurrentSessions: number;
  rememberMeDays: number;
  enforceDeviceTrust: boolean;
}

export interface InvitePolicyDto {
  inviteExpiryHours: number;
  allowSelfRegistration: boolean;
  requireEmailVerification: boolean;
}

export interface GeneralSettingsDto {
  defaultLanguage: LanguageCode;
  defaultTimezone: string;
  maintenanceMode: boolean;
}

export interface OrgSettingsDto {
  passwordPolicy: PasswordPolicyDto;
  sessionPolicy: SessionPolicyDto;
  invitePolicy: InvitePolicyDto;
  general: GeneralSettingsDto;
}

export interface UpdatePasswordPolicyRequest {
  minPasswordLength: number;
  requireUppercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  passwordExpiryDays: number;
  maxLoginAttempts: number;
  lockoutDurationMins: number;
}

export interface UpdateSessionPolicyRequest {
  sessionTimeoutMins: number;
  maxConcurrentSessions: number;
  rememberMeDays: number;
  enforceDeviceTrust: boolean;
}

export interface UpdateInvitePolicyRequest {
  inviteExpiryHours: number;
  allowSelfRegistration: boolean;
  requireEmailVerification: boolean;
}

export interface UpdateGeneralSettingsRequest {
  defaultLanguage: LanguageCode;
  defaultTimezone: string;
  maintenanceMode: boolean;
}
