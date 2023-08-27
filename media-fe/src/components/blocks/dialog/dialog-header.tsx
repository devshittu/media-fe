import React from 'react';
import { Navigation } from './types';
import { DialogCloseButton, NavigationGroup } from './';

type DialogHeaderProps = React.HTMLProps<HTMLDivElement> & {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  navigationItems?: Navigation[];
  currentStep?: number;
  totalSteps?: number;
};

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  (
    {
      title = 'Step Title',
      subtitle = 'Flash message',
      onClose,
      children,
      navigationItems = [],
      currentStep = 1,
      totalSteps = 1,
      ...props
    },
    ref,
  ) => {
    return (
      <header className="flex-shrink-0 mb-4" ref={ref} {...props}>
        {children ? (
          children
        ) : (
          <>
            <div className="flex justify-between items-center">
              <nav className="flex items-center space-x-2">
                {navigationItems.length > 0 && (
                  <NavigationGroup navigationItems={navigationItems} />
                )}
                <small className="ml-4 text-slate-600 dark:text-slate-400">
                  <span>{currentStep}</span> of <span>{totalSteps}</span> steps
                </small>
              </nav>
              <DialogCloseButton onClose={onClose} />
            </div>
            <h1 className="text-2xl tracking-wide leading-6 font-bold m-0 mt-5 text-slate-900 dark:text-slate-100">
              {title}
            </h1>
            <p className="font-mono text-sm leading-5 font-bold m-0 mt-1 text-cyan-500 whitespace-pre-wrap">
              {subtitle}
            </p>
          </>
        )}
      </header>
    );
  },
);

DialogHeader.displayName = 'DialogHeader';
