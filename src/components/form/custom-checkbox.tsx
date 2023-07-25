import React from 'react';

type CustomCheckboxProps<T extends { id: string; label?: string }> = {
  option: T;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  renderDisplayComponent?: (option: T) => JSX.Element; // Custom render function for display
};

function CustomCheckbox<T extends { id: string; label?: string }>({
  option,
  isChecked,
  onChange,
  renderDisplayComponent,
}: CustomCheckboxProps<T>) {
  const handleCheckboxChange = () => {
    onChange(!isChecked);
  };

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
        className="inline-flex items-center justify-between w-full p-5 text-slate-500 bg-white border-2 border-slate-200 cursor-pointer dark:hover:text-slate-300 dark:border-slate-700 peer-checked:border-cyan-600 hover:text-slate-600 dark:peer-checked:text-slate-300 peer-checked:text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        {renderDisplayComponent ? renderDisplayComponent(option) : null}
      </label>
    </li>
  );
}

export default CustomCheckbox;
//Path: src/components/form/custom-checkbox.tsx
