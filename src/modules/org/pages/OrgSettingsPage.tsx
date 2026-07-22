import { EmptyState, Skeleton } from "@/components/feedback";
import { PageHeader } from "@/components/common";
import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";
import {
  useOrgSettings,
  useUpdateGeneralSettings,
  useUpdateInvitePolicy,
  useUpdatePasswordPolicy,
  useUpdateSessionPolicy,
} from "../hooks/useOrgSettings";

import PasswordPolicyCard from "../components/org-settings/PasswordPolicyCard";
import SessionPolicyCard from "../components/org-settings/SessionPolicyCard";
import InvitePolicyCard from "../components/org-settings/InvitePolicyCard";
import GeneralSettingsCard from "../components/org-settings/GeneralSettingsCard";

const OrgSettingsPage = () => {
  const { data, isLoading, isError } = useOrgSettings();

  const passwordPolicyMutation = useUpdatePasswordPolicy();
  const sessionPolicyMutation = useUpdateSessionPolicy();
  const invitePolicyMutation = useUpdateInvitePolicy();
  const generalSettingsMutation = useUpdateGeneralSettings();

  const { hasPermission } = usePermissions();

  const canEditPassword = hasPermission(
    PERMISSIONS.ORG_SETTINGS_UPDATE_PASSWORD_POLICY,
  );

  const canEditSession = hasPermission(
    PERMISSIONS.ORG_SETTINGS_UPDATE_SESSION_POLICY,
  );

  const canEditInvite = hasPermission(
    PERMISSIONS.ORG_SETTINGS_UPDATE_INVITE_POLICY,
  );
  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (isError || !data?.data) {
    return (
      <EmptyState
        title="Unable to load organization settings"
        description="Please refresh the page or try again later."
      />
    );
  }

  const settings = data.data;

  const canEditGeneral = hasPermission(PERMISSIONS.ORG_SETTINGS_UPDATE_GENERAL);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Settings"
        description="Configure security policies, invitation rules, session management and organization-wide preferences."
      />

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
        <PasswordPolicyCard
          policy={settings.passwordPolicy}
          loading={passwordPolicyMutation.isPending}
          canEditPassword={canEditPassword}
          onSave={(request) => passwordPolicyMutation.mutate(request)}
        />

        <SessionPolicyCard
          policy={settings.sessionPolicy}
          loading={sessionPolicyMutation.isPending}
          canEditSession={canEditSession}
          onSave={(request) => sessionPolicyMutation.mutate(request)}
        />

        <InvitePolicyCard
          policy={settings.invitePolicy}
          loading={invitePolicyMutation.isPending}
          canEditInvite={canEditInvite}
          onSave={(request) => invitePolicyMutation.mutate(request)}
        />

        <GeneralSettingsCard
          settings={settings.general}
          loading={generalSettingsMutation.isPending}
          canEditGeneral={canEditGeneral}
          onSave={(request) => generalSettingsMutation.mutate(request)}
        />
      </div>
    </div>
  );
};

export default OrgSettingsPage;
