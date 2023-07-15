import React from 'react';

type LayoutCheckboxProps = {
  id: string;
  label: string;
  description: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  className?: string;
};

export const LayoutCheckbox: React.FC<LayoutCheckboxProps> = ({
  id,
  label,
  description,
  isChecked,
  onChange,
  className = '',
}) => {
  const handleCheckboxChange = () => {
    onChange(!isChecked);
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
        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="block">
          <div className="w-full text-lg font-semibold">{label}</div>
          <div className="w-full text-sm">{description}</div>
        </div>
      </label>
    </li>
  );
};

// export default LayoutCheckbox;
