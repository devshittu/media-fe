import React from 'react';
import { SettingsFieldset } from '../settings-fieldset';
import { SettingsField } from '../settings-field';
import { Category, useCategories } from '@/features/categories';
import CustomCheckboxGroup, {
  Option,
} from '@/components/form/custom-checkbox-group';
import { Loading } from '@/components/loading';
import { getObjectsByIds, updateDeep } from '@/utils';

//TODO remove Example usage:
// const originalData = {
//   id: '1',
//   user_id: '1',
//   theme: 'system',
//   language: 'en',
//   account_details: {
//     display_name: 'John Doe',
//     email: 'john.doe@example.com',
//   },
//   notifications: { email: { account: 1, marketing: 1, updates: 0 } },
//   favorite_categories: [
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6',
//     '7',
//     '8',
//     '9',
//     '10',
//     '11',
//   ],
//   last_updated: 1690123521,
//   created_at: 1690123521,
//   updated_at: 1690123521,
// };

// const updatedData = updateDeep(originalData, {
//   account_details: {
//     display_name: 'Jane Smitha',
//   },
//   notifications: { email: { marketing: 0 } },
// });

// console.log('updatedData', updatedData);

export type PersonalPreferencesProps = {
  userSelectedCategoriesId: string[];
};

export const PersonalPreferences = ({
  userSelectedCategoriesId = [],
}: PersonalPreferencesProps) => {
  const dataFromUseCategories = useCategories({});
  const handleCustomCheckboxGroupChange = (
    selectedOptions: Option<Category>[],
  ) => {
    // Handle the change of selected options here
    // e.g., update the state or perform other actions
    console.table(selectedOptions);
  };

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

  console.log('categories', userSelectedCategoriesId)
  const initCategories = getObjectsByIds(allCategories, userSelectedCategoriesId);

  return (
    <SettingsFieldset
      id="UserPreferences"
      title="Personal Preferences "
      description="Customize your experience! Set your preferred theme, language, and notification preferences in the Settings section."
    >
      <SettingsField
        id="fav_categories"
        title="Favorite Categories"
        description="Personalize your news feed! Choose from various topics like World News, Technology, Sports, and more to get updates tailored to your interests. Settings made easy!"
      >
        <CustomCheckboxGroup<Category, Category>
          initialSelectedOptions={initCategories}
          options={allCategories}
          onChange={handleCustomCheckboxGroupChange}
          renderDisplayComponent={DisplayComponent}
        />
      </SettingsField>
    </SettingsFieldset>
  );
};
//Path: src/features/settings/components/sections/personal-preferences.tsx
