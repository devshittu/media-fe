import React, { useEffect } from 'react';
import { useForm, Controller, FieldError } from 'react-hook-form';
import CustomCheckboxGroup, {
  Option,
} from '@/components/form/custom-checkbox-group';
import { Category } from '@/features/categories';
import { useCategoryContext } from '@/features/categories/hooks';
import { Button } from '@/components/button';
import { useWizardStepValidation } from '@/components/blocks/wizard/hooks';
import { useAccountSettingsStore } from '@/stores/app-settings';
import { getObjectsByIds } from '@/utils';

export const PersonalizeCategories = () => {
  const { modifiedSettings, updateModifiedSettings } =
    useAccountSettingsStore();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      user_categories:
        modifiedSettings.personal_settings.favorite_categories || [],
    },
    mode: 'all',
  });
  const { categories } = useCategoryContext();
  const selectedOptions = watch('user_categories', []);

  useWizardStepValidation(() => selectedOptions.length >= 3); // TODO: take out the magic number 3

  const onSubmit = async (data: any) => {
    const selectedCategoryIds = data.user_categories.map((item: any) =>
      typeof item === 'string' ? item : item.id,
    );

    updateModifiedSettings(
      ['personal_settings', 'favorite_categories'],
      selectedCategoryIds,
    );

    console.log('Update modifiedSettings:');
    console.log(modifiedSettings.personal_settings.favorite_categories);
  };

  const allCategories = (categories as Category[]).map((category) => ({
    ...category,
    label: category.title,
  })) as Option<Category>[];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="user_categories"
        control={control}
        rules={{
          validate: (value: Option<any>[]) =>
            (value?.length ?? 0) > 0 ||
            'At least one category must be selected',
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
              initialSelectedOptions={selectedCategories}
              onChange={onChange}
              renderAs="button"
              className="flex gap-4 flex-wrap"
              error={
                errors.user_categories?.message
                  ? (errors.user_categories as FieldError)
                  : null
              }
            />
          );
        }}
      />
      <Button
        // loading={!!updateSettings.isLoading}
        // disabled={updateSettings.isLoading}
        nativeType="submit"
        size="large"
        type="primary"
      >
        Update settings
      </Button>
    </form>
  );
};
//Path src/features/auth/components/signup-flow/personalize-categories.tsx
