'use client';
import React, { useState, ReactNode } from 'react';
import { XIcon } from '@/components/illustrations';
import { Button } from '@/components/button';

export enum BannerType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

type BannerProps = {
  dismissible?: boolean;
  type?: BannerType;
  onDismiss?: () => void;
  children: ReactNode; // To allow flexibility for passing any content
};

export const Banner = ({
  dismissible = true,
  type = BannerType.INFO,
  onDismiss,
  children,
}: BannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  let typeClasses = '';

  switch (type) {
    case BannerType.SUCCESS:
      typeClasses =
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-800 dark:border-green-300';
      break;
    case BannerType.ERROR:
      typeClasses =
        'bg-red-100 text-red-800 dark:bg-slate-700 dark:text-red-400 border-red-800 dark:border-red-400';
      break;
    case BannerType.WARNING:
      typeClasses =
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-800 dark:border-yellow-300';
      break;
    case BannerType.INFO:
    default:
      typeClasses =
        'bg-sky-100 text-sky-800 dark:bg-sky-700 dark:text-sky-400 border-sky-800 dark:border-sky-400';
      break;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      id="banner"
      tabIndex={-1}
      className={`z-50 flex justify-center w-full px-4 py-3 ${typeClasses}`}
    >
      <div className="items-center md:flex">
        <div className="text-sm md:text-base font-medium md:my-0">{children}</div>
        {dismissible && (
          <Button
            id={`close-banner`}
            onClick={handleDismiss}
            className="ml-4 text-slate-700 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-200"
          >
            <XIcon className="w-4 h-4" strokeWidth={3} />
          </Button>
        )}
      </div>
    </div>
  );
};

// Path: src/components/blocks/banner/banner.tsx
