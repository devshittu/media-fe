import React, { LabelHTMLAttributes } from 'react';
export type FieldError = {
  message: string;
};

export type InputFieldPropTypes = {
  type?: 'text' | 'email' | 'password' | 'textarea';
  //   label?: LabelHTMLAttributes<HTMLLabelElement>;
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
  const inputClasses = `
    bg-slate-50
    border border-slate-900 ring-blue-500 text-slate-900 
    text-sm 
    
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
    dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    `
    .trim()
    .replace(/\s+/g, ' ');
  const labelClasses =
    `block mb-2  uppercase tracking-wide text-slate-900 text-sm font-bold dark:text-slate-300`
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
            type={type}
            id={name.toLowerCase() + '-input'}
            name={name}
            className={inputClasses}
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
