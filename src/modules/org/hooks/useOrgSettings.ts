import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { orgSettingsApi } from "../api/orgSettingsApi";

import type {
  UpdateGeneralSettingsRequest,
  UpdateInvitePolicyRequest,
  UpdatePasswordPolicyRequest,
  UpdateSessionPolicyRequest,
} from "../types/orgSettings.types";

const ORG_SETTINGS_QUERY_KEY = ["organization-settings"] as const;

export const useOrgSettings = () =>
  useQuery({
    queryKey: ORG_SETTINGS_QUERY_KEY,
    queryFn: orgSettingsApi.getSettings,
    staleTime: 5 * 60 * 1000,
  });

export const useUpdatePasswordPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdatePasswordPolicyRequest) =>
      orgSettingsApi.updatePasswordPolicy(request),

    onSuccess: (settings) => {
      queryClient.setQueryData(ORG_SETTINGS_QUERY_KEY, settings);
    },
  });
};

export const useUpdateSessionPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateSessionPolicyRequest) =>
      orgSettingsApi.updateSessionPolicy(request),

    onSuccess: (settings) => {
      queryClient.setQueryData(ORG_SETTINGS_QUERY_KEY, settings);
    },
  });
};

export const useUpdateInvitePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateInvitePolicyRequest) =>
      orgSettingsApi.updateInvitePolicy(request),

    onSuccess: (settings) => {
      queryClient.setQueryData(ORG_SETTINGS_QUERY_KEY, settings);
    },
  });
};

export const useUpdateGeneralSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateGeneralSettingsRequest) =>
      orgSettingsApi.updateGeneralSettings(request),

    onSuccess: (settings) => {
      queryClient.setQueryData(ORG_SETTINGS_QUERY_KEY, settings);
    },
  });
};
