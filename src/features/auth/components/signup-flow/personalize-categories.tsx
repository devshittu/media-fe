import CustomCheckboxGroup, {
  Option,
} from '@/components/form/custom-checkbox-group';
import { Icon, XIcon } from '@/components/illustrations';
import { Category, useCategories } from '@/features/categories';
import { CategoryList } from '@/features/categories/components';
import Link from 'next/link';
import React, { useMemo } from 'react';

export const PersonalizeCategories = () => {
  const handleCustomCheckboxGroupChange = (
    selectedOptions: Option<Category>[],
  ) => {
    // Handle the change of selected options here
    // e.g., update the state or perform other actions
    console.table(selectedOptions);
  };


const categoriesData = useCategories({});
  const allCategories = (categoriesData.data.categories as Category[]).map(
    (category) => ({
      ...category,
      label: category.title, // Map the title to the label property
    })
  ) as Option<Category>[];


console.table(allCategories);
  return (
    <div>
      <CustomCheckboxGroup<Category, Category>
        options={allCategories}
        initialSelectedOptions={[]} // Use the converted array here
        onChange={handleCustomCheckboxGroupChange}
        renderAs='button'
        className='flex gap-4 flex-wrap'
      />
    </div>
  );
};
