import React, { useState, useEffect } from 'react';
import { ToastProps } from './types';
import { useKeyPress } from '@/hooks';

export const ToastComponent = ({
  id,
  type = 'success',
  message,
  position = 'bottom-center',
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const getToastClassName = () => {
    let className =
      'fixed flex items-center justify-between w-full max-w-xs lg:max-w-lg z-30 p-4 mb-4 text-slate-500 bg-white shadow rounded-lgx dark:text-slate-400 dark:bg-slate-800 ';

    if (type === 'success') {
      className += ' bg-green-50';
    } else if (type === 'danger') {
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
    } else if (type === 'danger') {
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
  return (
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
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === 'danger' && (
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === 'warning' && (
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span className="sr-only">{type} icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-slate-400 hover:text-slate-900 focus:ring-2 focus:ring-slate-300 p-1.5 hover:bg-slate-100 inline-flex h-8 w-8 dark:text-slate-500 dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700"
        onClick={handleClose}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

// Path: src/components/blocks/toast/toast-component.tsx
