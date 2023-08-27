import React, { useState } from 'react';
import CustomCheckbox, { RenderAs } from './custom-checkbox';
import { ChangeHandler, FieldError, UseFormRegister } from 'react-hook-form';
import { ErrorText } from '../labs';

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
  className?: string;
  renderAs?: RenderAs;
};

function CustomCheckboxGroup<T, P>({
  options,
  initialSelectedOptions = [],
  onChange,
  renderDisplayComponent,
  error,
  className,
  renderAs = 'default',
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
      <ul
        className={`${
          className
            ? className
            : 'grid w-full gap-2 grid-cols-2 md:gap-6  md:grid-cols-3 '
        }`}
      >
        {options.map((option) => (
          <CustomCheckbox
            key={option.id}
            option={option}
            isChecked={selectedOptions.some(
              (selectedOption) => selectedOption.id === option.id,
            )}
            onChange={(isChecked) => handleCheckboxChange(option, isChecked)}
            renderDisplayComponent={
              renderAs === 'custom' ? renderDisplayComponent : undefined
            }
            renderAs={renderAs}
          />
        ))}
      </ul>
      <div className="flex items-center min-h-[3rem]">
        {' '}
        {error && <ErrorText>{error.message}</ErrorText>}
      </div>
    </>
  );
}

export default CustomCheckboxGroup;

//Path: src/components/form/custom-checkbox-group.tsx
