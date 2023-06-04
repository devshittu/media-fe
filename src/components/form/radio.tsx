import React from 'react';
import { RadioProps } from './types';
import formStyles from './forms.module.css';

const getRadioClasses = (checked: boolean, disabled: boolean) => {
  let classes = 'w-4 h-4 border-slate-300 focus:ring-2 focus:ring-blue-300';
  if (checked && !disabled) {
    classes += ' border-slate-500 bg-slate-500';
  } else {
    classes += ' border-slate-300';
  }
  if (disabled) {
    classes += ' cursor-not-allowed opacity-50';
  }
  if (disabled && !checked) {
    classes += ' text-slate-300 dark:text-slate-700';
  } else {
    classes += ' text-slate-900 dark:text-slate-300';
  }
  if (!disabled) {
    classes +=
      ' dark:bg-slate-700 dark:border-slate-600 dark:focus:bg-blue-600 dark:focus:ring-blue-600';
  }
  return classes;
};

const getLabelClasses = (disabled: boolean) => {
  let classes = 'block';
  //   if (size !== 'small') {
  //     classes += ' ml-2';
  //   }
  //   if (size !== 'large') {
  //     classes += ' text-sm';
  //   }
  if (disabled) {
    classes += ' text-slate-300 dark:text-slate-700';
  } else {
    classes += ' text-slate-900 dark:text-slate-300';
  }
  return classes;
};

const Radio = ({
  id,
  name,
  value,
  selectedValue,
  disabled = false,
  onChange,
}: RadioProps) => {
  const radioClasses = getRadioClasses(false, disabled);
  const labelClasses = getLabelClasses(disabled);

  const handleChange = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <label
      className={`${formStyles.formControl} ${
        disabled ? formStyles.formControlDisabled : ''
      }`}
      htmlFor={id}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={value === selectedValue}
        disabled={disabled}
        className={formStyles.customRadioInput}
        onChange={handleChange}
      />
      <span className={`${formStyles.formItemLabel}`}>{value}</span>
    </label>
  );
};

export default Radio;

//Path: src/components/form/radio.tsx:
