import React, { useState, useEffect } from 'react';
import { ToastProps } from './types';
import { useKeyPress } from '@/hooks';
import Portal from '@/hoc/Portal';
import {
  AlertTriangleIcon,
  CheckIcon,
  XIcon,
} from '@/components/illustrations';

export const ToastComponent = ({
  id,
  isActive = false,
  type = 'success',
  message,
  position = 'bottom-center',
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isOpen, setIsOpen] = useState(isActive);

  const closeToast = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };
  const openToast = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (isActive) {
      openToast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const getToastClassName = () => {
    let className =
      'fixed flex items-center justify-between w-full max-w-xs lg:max-w-lg z-50 p-4 mb-4 text-slate-500 bg-white shadow rounded-lgx dark:text-slate-400 dark:bg-slate-800 ';

    if (type === 'success') {
      className += ' bg-green-50';
    } else if (type === 'error') {
      className += ' bg-red-50';
    } else if (type === 'warning') {
      className += ' bg-orange-50';
    }

    return className;
  };

  const getIconClassName = () => {
    let className =
      'inline-flex items-center justify-center flex-shrink-0 w-8 h-8';

    if (type === 'success') {
      className +=
        ' text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200';
    } else if (type === 'error') {
      className += ' text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200';
    } else if (type === 'warning') {
      className +=
        ' text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200';
    }

    return className;
  };

  const getPositionClassName = () => {
    let className = '';
    if (position === 'top-left') {
      className += ' top-5 left-5';
    } else if (position === 'top-center') {
      className += ' top-5 left-[50%] transform translate-x-[-50%]';
    } else if (position === 'top-right') {
      className += ' top-5 right-5';
    } else if (position === 'bottom-left') {
      className += ' bottom-5 left-5';
    } else if (position === 'bottom-center') {
      className += ' bottom-5  left-[50%] transform translate-x-[-50%]';
    } else if (position === 'bottom-right') {
      className += ' bottom-5 right-5';
    }

    return className;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);
  const escapePressed = useKeyPress('Escape');

  useEffect(() => {
    if (escapePressed) {
      closeToast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escapePressed]);
  return (
    <Portal wrapperId="toast-wrapper">
      <div
        id={id}
        className={`${getToastClassName()} ${getPositionClassName()} dark:text-slate-400 dark:divide-slate-700 space-x-4 divide-x divide-slate-200 dark:bg-slate-800  ${
          isOpen ? '' : 'hidden'
        }`}
        role="alert"
      >
        <div className="flex justify-normal items-center">
          <div className={getIconClassName()}>
            {type === 'success' && (
              <CheckIcon className="w-5 h-5" strokeWidth={3} />
            )}
            {type === 'error' && <XIcon className="w-5 h-5" strokeWidth={3} />}
            {type === 'warning' && (
              <AlertTriangleIcon className="w-5 h-5" strokeWidth={3} />
            )}
            <span className="sr-only">{type} icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
        </div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-slate-400 hover:text-slate-900 focus:ring-2 focus:ring-slate-300 p-1.5 hover:bg-slate-100 inline-flex h-8 w-8 dark:text-slate-500 dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700"
          onClick={closeToast}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <XIcon className="w-5 h-5" strokeWidth={3} />
        </button>
      </div>
    </Portal>
  );
};

// Path: src/components/blocks/toast/toast-component.tsx
