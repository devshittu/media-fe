import React, { useState, useMemo } from 'react';
import {
  SettingsField,
  SettingsFieldset,
  SettingsFieldsetFooter,
} from '../blocks';
import { Category, useCategories } from '@/features/categories';
import CustomCheckboxGroup, {
  Option,
} from '@/components/form/custom-checkbox-group';
import { Loading } from '@/components/loading';
import { getObjectsByIds, updateDeep } from '@/utils';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { Button } from '@/components/button';
import {
  NotificationPosition,
  NotificationType,
  useNotifications,
} from '@/stores/notifications';
import { PersonalSettingsData, Setting } from '../../types';
import { SettingsSectionProps } from '../types';
import { useUpdateUserSettings } from '../../api/update-user-settings';
import { useSettingsForm } from '../../hooks';
// Moved to a separate (function) component for clarity and reusability

const CategoryDisplay = (option: Category) => (
  <div className="block">
    <h3 className="w-full text-base md:text-lg font-bold text-ellipsis truncate">
      {option.title}
    </h3>
    <div className="w-full text-sm hidden md:block">{option.description}</div>
  </div>
);

export const PersonalSettings = ({
  initialSettingValues,
}: SettingsSectionProps) => {
  const { showNotification } = useNotifications();
  const defaultCategories = Array.from({ length: 20 }, (_, i) =>
    (i + 1).toString(),
  );
  const defaultSettings: PersonalSettingsData = {
    favorite_categories: defaultCategories,
  };

  const [localSettings, setLocalSettings] = useState<PersonalSettingsData>(
    initialSettingValues?.personal_settings || defaultSettings,
  );

  const onSuccess = () => {
    showNotification(
      {
        type: NotificationType.SUCCESS,
        title: 'Success',
        duration: 5000,
        message: 'Settings updated!',
      },
      { position: NotificationPosition.BOTTOM_RIGHT },
    );
  };

  const updateSettings = useUpdateUserSettings({ onSuccess });
  const { register, handleSubmit, formState, control, watch } =
    useForm<PersonalSettingsData>({
      defaultValues: localSettings,
    });

  const onSubmit = (data: PersonalSettingsData) => {
    const selectedCategoryIds = data.favorite_categories.map((item) =>
      typeof item === 'string' ? item : item.id,
    );

    // Update the personal_settings with the extracted IDs
    const updatedData = updateDeep(initialSettingValues, {
      personal_settings: {
        ...data,
        favorite_categories: selectedCategoryIds,
      },
    });

    updateSettings.submit(updatedData);
  };

  const categoriesData = useCategories({});
  const allCategories = (categoriesData.data.categories as Category[]).map(
    (category) => ({
      ...category,
      label: category.title,
    })
  ) as Option<Category>[];

  const userSelectedCategoriesId = useMemo(() => {
    return initialSettingValues?.personal_settings
      .favorite_categories as string[];
  }, [initialSettingValues]);

  const initCategories = useMemo(() => {
    return getObjectsByIds(allCategories, userSelectedCategoriesId);
  }, [allCategories, userSelectedCategoriesId]);

  const initCategoryIds = useMemo(() => {
    return initCategories.map((category) => category.id);
  }, [initCategories]);

  if (categoriesData.isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingsFieldset
        id="UserPreferences"
        title="Personal Preferences"
        description="Customize your experience based on your interests."
      >
        <SettingsField
          id="fav_categories"
          title="Favorite Categories"
          description="Your favorite categories or topics of interest."
        >
          <Controller
            name="favorite_categories"
            control={control}
            defaultValue={initCategoryIds}
            rules={{
              validate: (value: Option<any>[]) =>
                value.length > 0 || 'You must select at least one option.',
            }}
            render={({ field: { onChange, value } }) => {
              const categoryIds = value.map((item) =>
                typeof item === 'string' ? item : item.id,
              );
              const selectedCategories = getObjectsByIds(
                allCategories,
                categoryIds,
              );
              return (
                <CustomCheckboxGroup<Category, Category>
                  options={allCategories}
                  initialSelectedOptions={selectedCategories} // Use the converted array here
                  onChange={onChange}
                  renderDisplayComponent={CategoryDisplay}
                  renderAs='custom'
                  error={
                    formState.errors.favorite_categories?.message
                      ? (formState.errors.favorite_categories as FieldError)
                      : null
                  }
                />
              );
            }}
          />
        </SettingsField>

        <SettingsFieldsetFooter>
          <Button
            loading={!!updateSettings.isLoading}
            disabled={updateSettings.isLoading}
            nativeType="submit"
            size="large"
            type="primary"
          >
            Update settings
          </Button>
        </SettingsFieldsetFooter>
      </SettingsFieldset>
    </form>
  );
};

//Path: src/features/settings/components/sections/personal-preferences.tsx
