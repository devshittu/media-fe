import React, { useCallback } from 'react';
import { useForm, Controller, FieldError } from 'react-hook-form';
import CustomCheckboxGroup, {
  Option,
} from '@/components/form/custom-checkbox-group';
import { Category, useCategories } from '@/features/categories';
import { useWizardStepValidation } from '@/components/blocks/wizard/hooks';
import { useAccountSettingsStore } from '@/stores/app-settings';
import { getObjectsByIds } from '@/utils';
import { useUpdateUserSettings } from '@/features/settings/api/update-user-settings';
import { useSuccessNotification } from '@/features/settings/hooks';
import { UpdateSettingsButton } from '@/features/settings';
import { useStepCompletion } from '@/components/blocks/wizard/hooks/useStepCompletion';
import { LoadingButtonTextList } from '@/components/loading';
import { useSignupStore } from '@/stores/auth';
import { useCategoryContext } from '@/features/categories/hooks';

export const PersonalizeCategories = () => {
  const asyncOnCompleted = useCallback(async () => {
    // Perform any asynchronous operations here
    // console.log('Component task is completed.');
  }, []);
  const [isCompleted, setIsCompleted] = useStepCompletion({
    // trigger: true,
    // onCompleted: asyncOnCompleted,
    initialValue: false,
  });

  const { modifiedSettings, updateModifiedSettings } =
    useAccountSettingsStore();
  // Access store methods.
  const { setFavoriteCategories } = useSignupStore();
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
  // revisit the categories on the app provider to load it globally.
  const { categories, isLoading: categoriesLoading } = useCategoryContext();
  const selectedOptions = watch('user_categories', []);

  useWizardStepValidation(() => {
    // console.log('isCompleted', isCompleted);
    return selectedOptions.length >= 3 && isCompleted;
  }); // TODO: take out the magic number 3

  const showSuccess = useSuccessNotification(
    'Your preferred categories settings have been updated!',
  );
  const onSuccess = () => {
    showSuccess();
    setIsCompleted(true);
  };

  const updateSettings = useUpdateUserSettings({ onSuccess });

  const onSubmit = async (data: any) => {
    const selectedCategoryIds = data.user_categories.map((item: any) =>
      typeof item === 'string' ? item : item.id,
    );

    updateModifiedSettings(
      ['personal_settings', 'favorite_categories'],
      selectedCategoryIds,
    );
    // submit to favorites in the signup store
    setFavoriteCategories(selectedCategoryIds);

    console.log('modifiedSettings:// ', modifiedSettings);
    updateSettings.submit(modifiedSettings);
  };

  const allCategories = (categories as Category[]).map((category) => ({
    ...category,
    label: category.title,
  })) as Option<Category>[];

  return (
    <>
      {/* {isCompleted && <StepCompleted />}
      {!isCompleted && ( */}

      {categoriesLoading && <LoadingButtonTextList wrapped />}
      {!categoriesLoading && (
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
                categoryIds as string[],
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
          <UpdateSettingsButton isLoading={updateSettings.isLoading} />
        </form>
      )}
      {/* )} */}
    </>
  );
};
//Path src/features/auth/components/signup-flow/personalize-categories.tsx
