import React from 'react';

type CustomCheckboxProps = {
  id: string;
  label: string;
  description: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  className?: string;
  DisplayComponent?: React.ComponentType<any>; // Update the prop type to accept any component type
  displayComponentProps?: any; // Additional props for the DisplayComponent
};

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  description,
  isChecked,
  onChange,
  className = '',
  DisplayComponent,
  displayComponentProps, // Additional props for the DisplayComponent
}) => {
  const handleCheckboxChange = () => {
    onChange(!isChecked);
  };

  const DefaultDisplayComponent = (
    <div className="block">
      <div className="w-full text-lg font-semibold">{label}</div>
      <div className="w-full text-sm">{description}</div>
    </div>
  );

  const renderDisplayComponent = () => {
    if (DisplayComponent) {
      return <DisplayComponent {...displayComponentProps} />; // Pass displayComponentProps to the DisplayComponent
    }
    return DefaultDisplayComponent;
  };

  return (
    <li className={`w-full ${className}`}>
      <input
        type="checkbox"
        id={id}
        className="hidden peer"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={id}
        className="inline-flex items-center justify-between w-full p-5 text-slate-500 bg-white border-2 border-slate-200 cursor-pointer dark:hover:text-slate-300 dark:border-slate-700 peer-checked:border-cyan-600 hover:text-slate-600 dark:peer-checked:text-slate-300 peer-checked:text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        {renderDisplayComponent()}
      </label>
    </li>
  );
};

// export default CustomCheckbox;
