'use client';
import React, {
  ChangeEvent,
  LabelHTMLAttributes,
  forwardRef,
  useState,
} from 'react';
import { FieldError } from 'react-hook-form'; // Kept here for error handling, but it can be removed if you handle errors differently
import { EyeIcon, EyeOffIcon, Icon } from '../illustrations';

export type InputFieldPropTypes = {
  type?: 'text' | 'email' | 'password' | 'textarea';
  size?: 'small' | 'base' | 'large';
  id?: string;
  label?: string;
  showLabel?: boolean;
  name: string;
  required?: boolean | null;
  error?: FieldError | string; // Made more flexible
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  outlined?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  className?: string;
  actionIcon?: JSX.Element;
  actionIconAriaLabel?: string;
  onActionClick?: () => void;
  onFocus?: () => void; // Add onFocus prop
  onBlur?: () => void;  // Add onBlur prop
}
//  & React.InputHTMLAttributes<HTMLInputElement> // Extending native input attributes
//   & React.TextareaHTMLAttributes<HTMLTextAreaElement>; // Extending native textarea attributes


export const InputField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldPropTypes
>(
  (
    {
      id,
      type = 'text',
      size = 'base',
      name,
      label,
      error,
      placeholder,
      value,
      onChange,
      outlined = true,
      disabled = false,
      rounded = false,
      showLabel = false,
      className,
      actionIcon,
      onActionClick,
      actionIconAriaLabel,
      onFocus, // Extract onFocus from props
      onBlur,  // Extract onBlur from props
      ...inputProps
    }: InputFieldPropTypes,
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };

    const inputClasses = `
      block w-full font-bold
      bg-slate-50 text-slate-700 border-2 border-slate-700 dark:border-slate-300 placeholder-slate-400
      text-base
      focus:outline-none focus:ring-cyan-600 focus:border-cyan-600
      dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-cyan-300 dark:focus:border-cyan-300
      ${
        size === 'large'
          ? 'p-4 md:text-xl focus:ring-4'
          : size === 'base'
          ? 'p-2.5 md:text-base focus:ring-2'
          : 'p-1.5 sm:text-sm focus:ring-1'
      }
      ${rounded ? 'rounded-lg' : 'rounded-none'}
    `
      .trim()
      .replace(/\s+/g, ' ');

    const labelClasses = `
      block mb-2 uppercase tracking-wide text-slate-900 text-sm font-bold dark:text-slate-300
      ${
        size === 'large'
          ? 'md:text-xl'
          : size === 'base'
          ? 'md:text-base'
          : 'sm:text-sm'
      }
    `
      .trim()
      .replace(/\s+/g, ' ');

    const computedId = id ? id : `${name.toLowerCase()}-input`;

    return (
      <div className={className}>
        {showLabel && (
          <label htmlFor={computedId} className={labelClasses}>
            <h3 className="font-bold">{label || name}</h3>
          </label>
        )}
        {type === 'textarea' ? (
          <textarea
            className={inputClasses}
            id={computedId}
            name={name}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
            onFocus={onFocus}  // Pass onFocus to the textarea
            onBlur={onBlur}    // Pass onBlur to the textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...inputProps}
          />
        ) : (
          <div className="relative">
            <input
              className={inputClasses}
              name={name}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              id={computedId}
              ref={ref as React.Ref<HTMLInputElement>}
              type={type === 'password' && showPassword ? 'text' : type}
              onChange={onChange}
              onFocus={onFocus}  // Pass onFocus to the input
              onBlur={onBlur}    // Pass onBlur to the input
              {...inputProps}
            />
            {type === 'password' && (
              <button
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                type="button"
              >
                {showPassword ? (
                  <Icon
                    icon={<EyeOffIcon />}
                    strokeWidth={2.5}
                    className="w-5 h-5 text-slate-800 dark:text-slate-200"
                  />
                ) : (
                  <Icon
                    icon={<EyeIcon />}
                    strokeWidth={2.5}
                    className="w-5 h-5 text-slate-800 dark:text-slate-200"
                  />
                )}
              </button>
            )}
            {actionIcon && (
              <button
                onClick={onActionClick}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                type="button"
                aria-label={actionIconAriaLabel || 'Action button'}
              >
                <Icon
                  icon={actionIcon}
                  className="w-5 h-5 text-slate-800 dark:text-slate-200"
                />
              </button>
            )}
          </div>
        )}
        {error && (
          <div className="text-red-500">
            {typeof error === 'string' ? error : error.message}
          </div>
        )}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

//Path src/components/form/input-field.tsx
