import React, { LabelHTMLAttributes } from 'react';
export type FieldError = {
  message: string;
};

export type InputFieldPropTypes = {
  type?: 'text' | 'email' | 'password' | 'textarea';
  size?: 'small' | 'base' | 'large';
  showLabel?: boolean;
  name: string;
  error?: FieldError | null;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  outlined?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  className?: string;
};

export const InputField = ({
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
  showLabel = true,
  className,
}: InputFieldPropTypes) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  //   ${outlined ? 'ring-blue-500 border-blue-500 ' : ''}
  //     ${rounded ? 'rounded-lg ' : ''}
  //     ${error ? 'ring-red-500 border-red-500' : 'ring-slate-300 border-slate-300'}
  //     ${disabled ? 'bg-slate-100 opacity-50 cursor-not-allowed' : ''}
  //     ${className ?? ''}

  // "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
  // focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
  // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"

  const inputClasses = `
  block  w-full rounded-none font-bold
    bg-slate-50 text-slate-900
    border border-slate-900 border-slate-300
    text-base
    focus:outline-none focus:ring-4 focus:ring-inset focus:ring-slate-500 focus:border-slate-500
    dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    ${
      size === 'large'
        ? 'p-4 md:text-xl'
        : size === 'base'
        ? 'p-2.5 md:text-base'
        : 'p-1.5 sm:text-sm'
    }
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

  return (
    <>
      <div>
        {showLabel && (
          <label
            htmlFor={name.toLowerCase() + '-input'}
            className={labelClasses}
          >
            {name}
          </label>
        )}
        {type === 'textarea' ? (
          <textarea
            className={inputClasses}
            id={name.toLowerCase() + '-input'}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
          />
        ) : (
          <input
            className={inputClasses}
            type={type}
            id={name.toLowerCase() + '-input'}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
          />
        )}
        {error && <div className="text-red-500">{error.message}</div>}
      </div>
    </>
  );
};
