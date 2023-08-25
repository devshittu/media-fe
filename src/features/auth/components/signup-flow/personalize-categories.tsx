import { useStepValidation } from '@/components/blocks/wizard/hooks';
import { StepProps } from '@/components/blocks/wizard/types';
import CustomCheckboxGroup, {
  Option,
} from '@/components/form/custom-checkbox-group';
import { Icon, XIcon } from '@/components/illustrations';
import { Category, useCategories } from '@/features/categories';
import { CategoryList } from '@/features/categories/components';
import { useCategoryContext } from '@/features/categories/hooks';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';

export const PersonalizeCategories = ({
  onValidationStatusChange,
}: StepProps) => {
  // Define the validation function
  // const validate = () => true;

  // Call useStepValidation unconditionally
  // const isValid = useStepValidation(validate, [], onValidationStatusChange);

  // Call useCategories unconditionally
  // const { data: responseData, isLoading } = useCategories({});

  const { categories } = useCategoryContext();
  // Check if the data is still loading
  // if (isLoading || !responseData) {
  //   return <div>Loading...</div>; // You can replace this with a proper loading component
  // }

  const handleCustomCheckboxGroupChange = (
    selectedOptions: Option<Category>[],
  ) => {
    // Handle the change of selected options here
    console.table(selectedOptions);
  };

  const allCategories = (categories as Category[]).map((category) => ({
    ...category,
    label: category.title, // Map the title to the label property
  })) as Option<Category>[];

  return (
    <div>
      <CustomCheckboxGroup<Category, Category>
        options={allCategories}
        initialSelectedOptions={[]} // Use the converted array here
        onChange={handleCustomCheckboxGroupChange}
        renderAs="button"
        className="flex gap-4 flex-wrap"
      />
    </div>
  );
};

//Path src/features/auth/components/signup-flow/personalize-categories.tsx
