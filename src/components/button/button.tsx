import React, { MouseEventHandler, ReactNode } from 'react';

export type ButtonProps = {
  rounded?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  loading?: boolean;
  nativeType?: 'button' | 'submit' | 'reset';
  type?:
    | 'info'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'dark'
    | 'light'
    | 'adaptive'
    | null;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  expand?: boolean;
  badge?: string;
  title?: string;
  badgeType?:
    | 'info'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning';
  link?: string;
  children: ReactNode;
  as?: 'a' | 'button';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  outlined = false,
  title = '',
  rounded = false,
  disabled = false,
  loading = false,
  nativeType = 'button',
  type = null,
  icon,
  iconPosition = 'left',
  size = 'medium',
  expand = false,
  badge,
  badgeType = 'success',
  children,
  className,
  onClick,
}: ButtonProps) => {
  const getButtonTypeClasses = (): string => {
    let classes = ``;
    switch (type) {
      case 'info':
        classes += ` 
        ${
          !outlined
            ? `bg-sky-500 hover:bg-sky-600 text-white`
            : `border border-sky-500 hover:bg-sky-500 hover:text-white ${
                size == 'large'
                  ? 'border-4'
                  : size == 'medium'
                  ? 'border-2'
                  : 'border'
              }`
        } focus:ring-sky-300 `;
        break;
      case 'secondary':
        classes += ` 
        ${
          !outlined
            ? `bg-slate-500 hover:bg-slate-600 text-white`
            : `border border-slate-500 hover:bg-slate-500 hover:text-white ${
                size == 'large'
                  ? 'border-4'
                  : size == 'medium'
                  ? 'border-2'
                  : 'border'
              }`
        } focus:ring-slate-300 `;
        break;
      case 'success':
        classes += ` 
        ${
          !outlined
            ? `bg-emerald-500 hover:bg-emerald-600 text-white`
            : `border border-emerald-500 hover:bg-emerald-500 hover:text-white ${
                size == 'large'
                  ? 'border-4'
                  : size == 'medium'
                  ? 'border-2'
                  : 'border'
              }`
        } focus:ring-emerald-300 `;
        break;
      case 'danger':
        classes += ` 
        ${
          !outlined
            ? `bg-rose-500 hover:bg-rose-600 text-white`
            : `border border-rose-500 hover:bg-rose-500 hover:text-white ${
                size == 'large'
                  ? 'border-4'
                  : size == 'medium'
                  ? 'border-2'
                  : 'border'
              }`
        } focus:ring-rose-300 `;
        break;
      case 'warning':
        classes += ` 
        ${
          !outlined
            ? `bg-amber-500 hover:bg-amber-600 text-white`
            : `border border-amber-500 hover:bg-amber-500 hover:text-white ${
                size == 'large'
                  ? 'border-4'
                  : size == 'medium'
                  ? 'border-2'
                  : 'border'
              }`
        } focus:ring-amber-300 `;
        break;
      case 'dark':
        classes += ` 
        ${
          !outlined
            ? `bg-neutral-900 hover:bg-neutral-950 text-white`
            : `border border-neutral-900 hover:bg-neutral-900 hover:text-white ${
                size == 'large'
                  ? 'border-4'
                  : size == 'medium'
                  ? 'border-2'
                  : 'border'
              }`
        } focus:ring-neutral-300 `;
        break;

      case 'adaptive':
        classes += ` 
        ${
          !outlined
            ? `bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-950 dark:hover:bg-neutral-150 dark:text-black text-white`
            : `border dark:border-neutral-100 border-neutral-900 dark:hover:bg-neutral-100 hover:bg-neutral-900 text-neutral-700  dark:text-neutral-300 dark:hover:text-black hover:text-white ${
                size == 'large'
                  ? 'border-4'
                  : size == 'medium'
                  ? 'border-2'
                  : 'border'
              }`
        } dark:focus:ring-neutral-300 focus:ring-neutral-700  `;
        break;

      case 'primary':
        classes += ` 
        ${
          !outlined
            ? `bg-cyan-500 hover:bg-cyan-600 text-white`
            : `border border-cyan-500 hover:bg-cyan-500 hover:text-white ${
                size == 'large'
                  ? 'border-4'
                  : size == 'medium'
                  ? 'border-2'
                  : 'border'
              }`
        } focus:ring-cyan-300 `;
        break;
      default:
        classes += ``;
    }
    return classes;
  };

  const buttonTypeClasses = getButtonTypeClasses();

  const getBadgeTypeClasses = (): string => {
    let classes = ``;
    switch (badgeType) {
      case 'info':
        classes += `bg-sky-500 text-sky-900`;
        break;
      case 'secondary':
        classes += ` bg-slate-500 text-slate-900`;
        break;
      case 'success':
        classes += ` bg-emerald-500 text-emerald-900`;
        break;
      case 'danger':
        classes += ` bg-rose-500 text-rose-900`;
        break;
      case 'warning':
        classes += ` bg-amber-500 text-amber-900`;
        break;
      case 'primary':
      default:
        classes += ` bg-neutral-900 text-neutral-950 text-white`;
    }
    return `${classes} `;
  };
  const badgeTypeClasses = getBadgeTypeClasses();
  const buttonClasses = `relative inline-flex items-center
    ${buttonTypeClasses} ${type !== null && 'focus:z-10 focus:ring-4'} 
    ${rounded ? 'rounded-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
    ${loading ? 'pointer-events-none' : ''}
    ${
      {
        large: `${type !== null && 'px-6 py-3'} text-lg`,
        medium: `${type !== null && 'px-4 py-2'} text-base`,
        small: `${type !== null && 'px-2 py-1'} text-sm`,
      }[size]
    }
    ${expand ? 'w-full' : ''}
    ${className ?? ''}
  `
    .trim()
    .replace(/[\n\t]/g, '')
    .replace(/\s+/g, ' '); // to remove extra spaces.

  const iconClasses = `${
    size === 'large' ? ' h-8 w-8' : size === 'medium' ? ' h-5 w-5' : ' h-4 w-4'
  }`
    .trim()
    .replace(/[\n\t]/g, '')
    .replace(/\s+/g, ' ');

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2">
          {React.cloneElement(icon, {
            className: iconClasses,
          })}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">
          {React.cloneElement(icon, {
            className: iconClasses,
          })}
        </span>
      )}
    </>
  );

  const buttonWithBadge = (
    <>
      {buttonContent}
      {badge && (
        <span
          className={`absolute -top-2 -right-2 px-2 py-1 text-xs ${badgeTypeClasses} rounded-full`}
        >
          {badge}
        </span>
      )}
    </>
  );
  return (
    <button
      type={nativeType}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {loading ? (
        <>
          <span className="mx-3">
            <svg
              className={`animate-spin -ml-1 ${iconClasses}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        </>
      ) : (
        <>{buttonWithBadge}</>
      )}
    </button>
  );
};

//Path src/components/button/button.tsx
