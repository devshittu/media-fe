import React, { forwardRef } from 'react';
import { ChangeHandler, FieldError, UseFormRegister } from 'react-hook-form';

export type SelectFieldOption = {
  value: string;
  label: string;
};

export type SelectFieldProps = {
  id: string;
  label: string;
  size?: 'small' | 'default' | 'large';
  disabled?: boolean;
  rounded?: boolean;
  showLabel?: boolean;
  options: SelectFieldOption[];
  error?: FieldError;
  onChange?: ChangeHandler;
  placeholder?: string;
  className?: string;
} & Partial<ReturnType<UseFormRegister<Record<string, unknown>>>>;

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      id,
      label,
      size = 'default',
      disabled = false,
      rounded = false,
      showLabel = false,
      options,
      error,
      onChange,
      placeholder,
      className,
      ...selectProps
    }: SelectFieldProps,
    ref: React.Ref<HTMLSelectElement>,
  ) => {
    const sizeClasses = {
      small: 'p-2 text-sm',
      default: 'p-2.5 text-sm',
      large: 'px-4 py-3 text-base',
    };

    return (
      <div className={`select-field ${className}`}>
        {showLabel && (
          <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
          >
            {label}
          </label>
        )}
        <select
          // {...register(id, { onChange })}
          id={id}
          className={`block w-full ${
            sizeClasses[size]
          } text-slate-900 border border-slate-300 bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
        ${rounded ? 'rounded-lg' : ''}
        ${disabled ? 'cursor-not-allowed' : ''} ${
            error ? 'border-red-500' : ''
          }`}
          ref={ref}
          {...selectProps}
          disabled={disabled}
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
          <p id={`${id}-error`} className="mt-2 text-sm text-red-500">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);

SelectField.displayName = 'InputField';

//Path: src/components/form/select-field.tsx
