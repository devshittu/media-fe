'use client';
import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

export type SelectFieldOption = {
  value: string;
  label: string;
};

export type SelectFieldProps = {
  id: string;
  label: string;
  name: string;
  size?: 'small' | 'base' | 'large';
  disabled?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  showLabel?: boolean;
  options: SelectFieldOption[];
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Standard onChange
  value?: string; // Add value prop
  error?: FieldError | string;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      id,
      label,
      name,
      size = 'base',
      disabled = false,
      rounded = false,
      showLabel = false,
      options,
      error,
      onChange,
      value,
      placeholder,
      className,
      ...selectProps
    }: SelectFieldProps,
    ref: React.Ref<HTMLSelectElement>,
  ) => {
    const sizeClasses = {
      small: 'p-2 text-sm',
      base: 'p-2.5 text-sm',
      large: 'px-4 py-3 text-base',
    };

    const selectClasses = `
    block  w-full font-bold
    bg-slate-50 text-slate-700 border-2 border-slate-700  dark:border-slate-300 placeholder-slate-400
    text-base
    
    focus:outline-none focus:ring-slate-700x focus:border-slate-700x focus:ring-cyan-600 focus:border-cyan-600
    dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-cyan-300 dark:focus:border-cyan-300
    ${
      size === 'large'
        ? 'p-4 md:text-xl focus:ring-4 '
        : size === 'base'
        ? 'p-2.5 md:text-base focus:ring-2'
        : 'p-1.5 sm:text-sm focus:ring-1'
    }
    ${rounded ? 'rounded-lg ' : 'rounded-none'}
    `
      .trim()
      .replace(/\s+/g, ' ');
    const labelClasses =
      `block mb-2  uppercase tracking-wide text-slate-900 text-sm font-bold dark:text-slate-300
    ${
      size === 'large'
        ? 'md:text-xl'
        : size === 'base'
        ? 'md:text-base'
        : 'sm:text-sm'
    }`
        .trim()
        .replace(/\s+/g, ' ');
    const computedId = id ? id : name.toLowerCase() + '-select';

    return (
      <div className={`select-field ${className}`}>
        {showLabel && (
          <label htmlFor={computedId} className={labelClasses}>
            <h3 className="font-bold">{label || name}</h3>
          </label>
        )}
        <select
          id={computedId}
          name={name}
          className={`${selectClasses}`}
          ref={ref}
          onChange={onChange}
          value={value} // Set value from props
          disabled={disabled}
          {...selectProps}
          {...(error
            ? { 'aria-invalid': 'true', 'aria-describedby': `${id}-error` }
            : {})}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${id}-error`} className="text-red-500">
            {typeof error === 'string' ? error : error.message}
          </p>
        )}
      </div>
    );
  },
);

SelectField.displayName = 'SelectField';

//Path: src/components/form/select-field.tsx
