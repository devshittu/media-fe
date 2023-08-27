import { updateDeep } from '@/utils';
import { useUpdateUserSettings } from '../api/update-user-settings';
import { useSuccessNotification } from './useSuccessNotification';

export const useUpdateSettings = (
  initialSettingValues: any,
  section: string,
) => {
  const showSuccess = useSuccessNotification('Settings updated!');
  const updateSettings = useUpdateUserSettings({ onSuccess: showSuccess });

  return (data: any) => {
    const updatedData = updateDeep(initialSettingValues, {
      [section]: data,
    });
    updateSettings.submit(updatedData);
  };
};

//Path: src/features/settings/hooks/useUpdateSettings.ts
