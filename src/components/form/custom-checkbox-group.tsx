import React, { useState } from 'react';
import CustomCheckbox from './custom-checkbox';
import { ChangeHandler, FieldError, UseFormRegister } from 'react-hook-form';

export type Option<T> = T & {
  id: string;
  label?: string;
};

type CustomCheckboxGroupProps<T, P> = {
  options: Option<T>[];
  initialSelectedOptions?: Option<T>[]; // Make initialSelectedOptions optional
  onChange: (selectedOptions: Option<T>[]) => void;
  renderDisplayComponent?: (option: T) => JSX.Element; // Custom render function for display
  error?: FieldError | null;
};

function CustomCheckboxGroup<T, P>({
  options,
  initialSelectedOptions = [],
  onChange,
  renderDisplayComponent,
  error,
}: CustomCheckboxGroupProps<T, P>) {
  const [selectedOptions, setSelectedOptions] = useState<Option<T>[]>(
    initialSelectedOptions,
  );

  const handleCheckboxChange = (option: Option<T>, isChecked: boolean) => {
    const updatedOptions = isChecked
      ? [...selectedOptions, option]
      : selectedOptions.filter(
          (selectedOption) => selectedOption.id !== option.id,
        );

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <>
      <ul className="grid w-full gap-2 grid-cols-2 md:gap-6  md:grid-cols-3">
        {options.map((option) => (
          <CustomCheckbox
            key={option.id}
            option={option}
            isChecked={selectedOptions.some(
              (selectedOption) => selectedOption.id === option.id,
            )}
            onChange={(isChecked) => handleCheckboxChange(option, isChecked)}
            renderDisplayComponent={renderDisplayComponent}
          />
        ))}
      </ul>

      {error && <div className="text-red-500">{error.message}</div>}
    </>
  );
}

export default CustomCheckboxGroup;

//Path: src/components/form/custom-checkbox-group.tsx
