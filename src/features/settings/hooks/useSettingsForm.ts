import { useState } from 'react';
import { DeepPartial, updateDeep } from '@/utils';
import { useUpdateUserSettings } from '../api/patch-update-user-settings';
import { useSuccessNotification } from './useSuccessNotification';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { Setting } from '../types';

export const useSettingsForm = <T extends Setting, K extends keyof T>(
  entireSettingsObject: T | undefined,
  section: K,
) => {
  if (!entireSettingsObject) {
    throw new Error('Settings object is undefined');
  }
  const sectionDefaults: FieldValues = entireSettingsObject[
    section
  ] as FieldValues;

  const { register, handleSubmit, formState, control } = useForm({
    defaultValues: sectionDefaults,
  });

  const showSuccess = useSuccessNotification('Settings updated!');
  const updateSettings = useUpdateUserSettings({ onSuccess: showSuccess });

  const onSubmit = (data: typeof sectionDefaults) => {
    console.log('changed data:// ', data);
    const updatedData = updateDeep(entireSettingsObject, {
      [section]: data,
    } as DeepPartial<T>);
    console.log('updatedData:// ', JSON.stringify(updatedData));
    updateSettings.submit(updatedData);
  };

  return {
    register,
    handleSubmit,
    formState,
    control,
    onSubmit,
    sectionDefaults,
  };
};

//Path: src/features/settings/hooks/useSettingsForm.ts
