import { useState } from 'react';

type CheckboxProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

const Checkbox = ({
  label,
  checked = false,
  onChange,
  className = '',
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
      />
      <span className="ml-2 text-sm">{label}</span>
    </label>
  );
};

export default Checkbox;

// Path: src/components/form/checkbox.tsx:
