import { useState } from 'react';
import formStyles from './forms.module.css';
import { CheckboxProps } from './types';

const Checkbox = ({
  id,
  name,
  label,
  showLabel = false,
  checked = false,
  disabled = false,
  useAs = 'labelled',
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
  if (useAs === 'bare') {
    return (
      <>
        <div
          className={`${formStyles.formControl}  ${
            disabled ? formStyles.formControlDisabled : ''
          }`}
        >
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className={formStyles.customCheckboxInput}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <label
        className={`${formStyles.formControl}  ${
          disabled ? formStyles.formControlDisabled : ''
        }
          ${className ? className : ''}`}
      >
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className={formStyles.customCheckboxInput}
        />
        {showLabel && (
          <span className={`${formStyles.formItemLabel}`}>{label}</span>
        )}
      </label>
    </>
  );
};

export default Checkbox;

// Path: src/components/form/checkbox.tsx:
