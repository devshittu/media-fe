import React from 'react';
import { SettingsField, SettingsFieldset } from '../blocks/';
import { Category, useCategories } from '@/features/categories';
import CustomCheckboxGroup, {
  Option,
} from '@/components/form/custom-checkbox-group';
import { Loading } from '@/components/loading';
import { getObjectsByIds } from '@/utils';

import { useForm, Controller, FieldError } from 'react-hook-form';

export type PersonalPreferencesProps = {
  userSelectedCategoriesId: string[];
};

export const PersonalPreferences = ({
  userSelectedCategoriesId = [],
}: PersonalPreferencesProps) => {
  const { handleSubmit, control, formState } = useForm();

  const onSubmit = (data: any) => {
    console.log(data.checkboxGroup); // This will print the selected options
  };

  const dataFromUseCategories = useCategories({});

  const DisplayComponent = (option: Category) => (
    <>
      <div className="block">
        <h3 className="w-full text-base md:text-lg font-bold text-ellipsis truncate">
          {option.title}
        </h3>
        <div className="w-full text-sm hidden md:block">
          {option.description}
        </div>
      </div>
    </>
  );

  if (dataFromUseCategories.isLoading) {
    return <Loading />;
  }

  const allCategories = dataFromUseCategories.data as Option<Category>[];

  console.log('categories', userSelectedCategoriesId);

  const initCategories = getObjectsByIds(
    allCategories,
    userSelectedCategoriesId,
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingsFieldset
        id="UserPreferences"
        title="Personal Preferences"
        description="Customize your experience! Set your preferred theme, language, and notification preferences in the Settings section."
      >
        <SettingsField
          id="fav_categories"
          title="Favorite Categories"
          description="Personalize your news feed! Choose from various topics like World News, Technology, Sports, and more to get updates tailored to your interests. Settings made easy!"
        >
          <Controller
            name="checkboxGroup"
            control={control}
            defaultValue={initCategories}
            rules={{
              validate: (value: Option<any>[]) =>
                value.length > 0 || 'You must select at least one option.',
            }}
            render={({ field: { onChange, value } }) => (
              <CustomCheckboxGroup<Category, Category>
                options={allCategories}
                initialSelectedOptions={value}
                onChange={onChange}
                renderDisplayComponent={DisplayComponent}
                error={
                  formState.errors.checkboxGroup?.message
                    ? (formState.errors.checkboxGroup as FieldError)
                    : null
                }
              />
            )}
          />
        </SettingsField>
      </SettingsFieldset>
      <button type="submit">Submit</button>
    </form>
  );
};
//Path: src/features/settings/components/sections/personal-preferences.tsx
