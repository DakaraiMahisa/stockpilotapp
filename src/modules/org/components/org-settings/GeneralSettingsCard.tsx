import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LANGUAGE_OPTIONS } from "@/constants/languages";
import { TIMEZONE_OPTIONS } from "@/constants/timezones";
import { usePermissions } from "@/hooks/usePermissions";
import { PERMISSIONS } from "@/constants/permissions";
import { Button, Select, Switch } from "@/components/ui";
import SettingsCard from "@/components/common/SettingsCard";

import {
  generalSettingsSchema,
  type GeneralSettingsFormData,
} from "../../schema/validation/generalSettings.schema";

import type {
  GeneralSettingsDto,
  UpdateGeneralSettingsRequest,
} from "../../types/orgSettings.types";

interface GeneralSettingsCardProps {
  settings: GeneralSettingsDto;
  loading?: boolean;
  canEditGeneral?: boolean;
  onSave: (request: UpdateGeneralSettingsRequest) => void;
}

const GeneralSettingsCard = ({
  settings,
  loading = false,
  onSave,
}: GeneralSettingsCardProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<GeneralSettingsFormData>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      defaultLanguage: settings.defaultLanguage,
      defaultTimezone: settings.defaultTimezone,
      maintenanceMode: settings.maintenanceMode,
    },
  });

  useEffect(() => {
    reset({
      defaultLanguage: settings.defaultLanguage,
      defaultTimezone: settings.defaultTimezone,
      maintenanceMode: settings.maintenanceMode,
    });
  }, [settings, reset]);

  const submit = (data: GeneralSettingsFormData) => {
    onSave(data);
  };
  const { hasPermission } = usePermissions();

  const canEdit = hasPermission(PERMISSIONS.ORG_SETTINGS_UPDATE_GENERAL);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <SettingsCard
        title="General Settings"
        description="Configure application defaults and maintenance mode."
        footer={
          <Button
            type="submit"
            loading={loading}
            disabled={!isDirty || !canEdit}
          >
            Save Changes
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Controller
            control={control}
            name="defaultLanguage"
            render={({ field }) => (
              <Select
                label="Default Language"
                value={field.value}
                options={LANGUAGE_OPTIONS}
                error={errors.defaultLanguage?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="defaultTimezone"
            render={({ field }) => (
              <Select
                label="Default Timezone"
                value={field.value}
                options={TIMEZONE_OPTIONS}
                error={errors.defaultTimezone?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-8">
          <Controller
            control={control}
            name="maintenanceMode"
            render={({ field }) => (
              <Switch
                label="Maintenance Mode"
                description="Temporarily restrict access to the application while maintenance is being performed."
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </SettingsCard>
    </form>
  );
};

export default GeneralSettingsCard;
