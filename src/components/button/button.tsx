import React, { ReactNode } from 'react';

export type ButtonProps = {
  solid?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'info' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  expand?: boolean;
  badge?: string;
  badgeColor?: string;
  link?: string;
  children: ReactNode;
};

export const Button = ({
  solid = true,
  rounded = true,
  disabled = false,
  loading = false,
  type = 'primary',
  icon,
  iconPosition = 'left',
  size = 'medium',
  expand = false,
  badge,
  badgeColor = 'gray',
  link,
  children,
}: ButtonProps) => {
  const buttonClasses = `
    ${
      solid
        ? `bg-${type}-500 hover:bg-${type}-600 text-white`
        : `border border-${type}-500 hover:bg-${type}-500 hover:text-white`
    }
    ${rounded ? 'rounded-full' : 'rounded'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
    ${loading ? 'pointer-events-none' : ''}
    ${
      size === 'large'
        ? 'px-6 py-3 text-lg'
        : size === 'medium'
        ? 'px-4 py-2 text-base'
        : 'px-2 py-1 text-sm'
    }
    ${expand ? 'w-full' : ''}
  `;

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  const buttonWithBadge = (
    <div className="relative inline-flex items-center">
      <span className={buttonClasses}>{buttonContent}</span>
      {badge && (
        <span
          className={`absolute -top-1 -right-1 px-2 py-1 bg-${badgeColor}-200 text-${badgeColor}-800 rounded-full`}
        >
          {badge}
        </span>
      )}
    </div>
  );

  if (link) {
    return (
      <a href={link} className={buttonClasses}>
        {badge ? buttonWithBadge : buttonContent}
      </a>
    );
  }

  return (
    <button className={buttonClasses} disabled={disabled}>
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20v-4a3.998 3.998 0 01-2.494-7.34L8 7.1V2H4v4c0 4.411 3.589 8 8 8v-2.086l-2.586-2.587z"
          ></path>
        </svg>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
      {badge && (
        <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-800 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
};
