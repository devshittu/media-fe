import React from 'react';
import { Button } from '../button';
export type RenderAs = 'default' | 'button' | 'custom';

type CustomCheckboxProps<T extends { id: string; label?: string }> = {
  option: T;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  renderDisplayComponent?: (option: T) => JSX.Element; // Custom render function for display
  renderAs: RenderAs;
};

function CustomCheckbox<T extends { id: string; label?: string }>({
  option,
  isChecked,
  onChange,
  renderDisplayComponent,
  renderAs = 'default',
}: CustomCheckboxProps<T>) {
  const handleCheckboxChange = () => {
    onChange(!isChecked);
  };

  if (renderAs === 'button') {
    return (
      <li>
        <input
          type="checkbox"
          id={option.id}
          className="hidden peer"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <Button
          id={`checkbox-${option.label}`}
          type={isChecked ? 'adaptive' : 'adaptive'}
          outlined={!isChecked}
          size="medium"
          onClick={handleCheckboxChange}
          className="font-serif text-xl text-slate-700 !py-2"
        >
          {option.label}
        </Button>
      </li>
    );
  }
  return (
    <li className="w-full">
      <input
        type="checkbox"
        id={option.id}
        className="hidden peer"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={option.id}
        className="inline-flex items-center justify-between w-full p-2 md:p-5 text-slate-500 bg-white border-2 border-slate-200 cursor-pointer dark:hover:text-slate-300 dark:border-slate-700 peer-checked:border-cyan-600 hover:text-slate-600 dark:peer-checked:text-slate-300 peer-checked:text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        {renderDisplayComponent ? renderDisplayComponent(option) : null}
      </label>
    </li>
  );
}

export default CustomCheckbox;
//Path: src/components/form/custom-checkbox.tsx
