import React, { LabelHTMLAttributes, forwardRef } from 'react';
import { ChangeHandler, FieldError, UseFormRegister } from 'react-hook-form';

export type InputFieldPropTypes = {
  type?: 'text' | 'email' | 'password' | 'textarea';
  size?: 'small' | 'base' | 'large';
  id?: string;
  label?: string;
  showLabel?: boolean;
  name: string;
  required?: boolean | null;
  error?: FieldError;
  placeholder?: string;
  value?: string;
  // onChange?: (value: string) => void;
  onChange?: ChangeHandler;
  outlined?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  className?: string;
} & Partial<ReturnType<UseFormRegister<Record<string, unknown>>>>;

export const InputField = forwardRef<HTMLInputElement, InputFieldPropTypes>(
  ({
  id,
  type = 'text',
  size = 'base',
  name,
  error,
  placeholder,
  value,
  onChange,
  outlined = true,
  disabled = false,
  rounded = false,
  showLabel = false,
  className,
      ...inputProps
}: InputFieldPropTypes, ref: React.Ref<HTMLInputElement>) => {
//     ({
//   id,
//   type = 'text',
//   size = 'base',
//   name,
//   error,
//   placeholder,
//   value,
//   onChange,
//   outlined = true,
//   disabled = false,
//   rounded = false,
//   showLabel = false,
//   className,
// }: InputFieldPropTypes) => {

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   if (onChange) {
  //     onChange(e.target.value);
  //   }
  // };

  //   ${outlined ? 'ring-blue-500 border-blue-500 ' : ''}
  //     ${rounded ? 'rounded-lg ' : ''}
  //     ${error ? 'ring-red-500 border-red-500' : 'ring-slate-300 border-slate-300'}
  //     ${disabled ? 'bg-slate-100 opacity-50 cursor-not-allowed' : ''}
  //     ${className ?? ''}

  //focus:ring-inset
  const inputClasses = `
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
  const computedId = id ? id : name.toLowerCase() + '-input';

  return (
    <>
      <div className={className}>
        {showLabel && (
          <label htmlFor={computedId} className={labelClasses}>
            {name}
          </label>
        )}
        {type === 'textarea' ? (
          <textarea
            className={`${inputClasses}`}
            id={computedId}
            name={name}
            placeholder={placeholder}
            value={value}
            {...inputProps}
            disabled={disabled}
          />
        ) : (
            <input
            className={inputClasses}
            name={name}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            id={computedId}
            ref={ref}
            type={type}
            {...inputProps}
          />
        )}
        {error && <div className="text-red-500">{error.message}</div>}
      </div>
    </>
  );
 }
);
InputField.displayName = "InputField"