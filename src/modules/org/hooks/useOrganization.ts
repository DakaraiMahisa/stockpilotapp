import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { orgApi } from "../api/orgApi";

import type {
  LogoConfirmRequest,
  LogoPresignedRequest,
  UpdateOrganizationRequest,
} from "../types/org.types";

const ORGANIZATION_QUERY_KEY = ["organization"] as const;

export const useOrganization = () =>
  useQuery({
    queryKey: ORGANIZATION_QUERY_KEY,
    queryFn: orgApi.getProfile,
    staleTime: 5 * 60 * 1000,
  });

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateOrganizationRequest) =>
      orgApi.updateProfile(request),

    onSuccess: (organization) => {
      queryClient.setQueryData(ORGANIZATION_QUERY_KEY, organization);
    },
  });
};

export const useGenerateLogoUploadUrl = () =>
  useMutation({
    mutationFn: (request: LogoPresignedRequest) =>
      orgApi.generateLogoUploadUrl(request),
  });

export const useConfirmLogoUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: LogoConfirmRequest) =>
      orgApi.confirmLogoUpload(request),

    onSuccess: (organization) => {
      queryClient.setQueryData(ORGANIZATION_QUERY_KEY, organization);
    },
  });
};
