import { Button } from '@/components/button';
import React, { HTMLAttributes } from 'react';
export enum BadgeType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export enum BadgeSize {
  SMALL = 'small',
  BASE = 'base',
  LARGE = 'large',
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  rounded?: boolean;
  outlined?: boolean;
  type?: BadgeType;
  icon?: React.ReactNode;
  size?: BadgeSize;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Badge = ({
  rounded,
  outlined,
  type,
  icon,
  size,
  children,
  onClick,
  ...props
}: BadgeProps) => {
  let baseClasses = 'inline-flex items-center font-medium px-2.5 py-0.5 mr-2';
  let typeClasses = '';
  let sizeClasses = '';
  let borderClasses = '';

  switch (type) {
    case BadgeType.SUCCESS:
      typeClasses =
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-800 dark:border-green-300';
      break;
    case BadgeType.ERROR:
      typeClasses =
        'bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border-red-800  dark:border-red-400';
      break;
    case BadgeType.WARNING:
      typeClasses =
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-800 dark:border-yellow-300';
      break;
    case BadgeType.INFO:
    default:
      //   typeClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-400  border-blue-800 dark:border-blue-400';
      typeClasses =
        'bg-sky-100 text-sky-800 dark:bg-sky-700 dark:text-sky-400  border-sky-800 dark:border-sky-400';
      break;
  }

  switch (size) {
    case BadgeSize.SMALL:
      sizeClasses = 'text-xs';
      break;
    case BadgeSize.LARGE:
      sizeClasses = 'text-xl';
      break;
    case BadgeSize.BASE:
    default:
      sizeClasses = 'text-base';
      break;
  }

  if (outlined) {
    switch (size) {
      case BadgeSize.SMALL:
        borderClasses = 'border';
        break;
      case BadgeSize.BASE:
        borderClasses = 'border-2';
        break;
      case BadgeSize.LARGE:
        borderClasses = 'border-4';
        break;
      default:
        borderClasses = 'border';
        break;
    }
    typeClasses += ` ${borderClasses}`;
  }

  if (rounded) {
    baseClasses += ' rounded-full';
  }

  const badgeContent = (
    <span className={`${baseClasses} ${typeClasses} ${sizeClasses}`} {...props}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );

  return onClick ? (
    <Button
      onClick={onClick}
      className="focus:outline-none"
      {...props}
      nativeType="button"
    >
      {badgeContent}
    </Button>
  ) : (
    badgeContent
  );
};
