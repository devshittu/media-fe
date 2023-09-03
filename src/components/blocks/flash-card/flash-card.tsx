import React, { useState } from 'react';
import { XIcon } from '@/components/illustrations';
import { Button } from '@/components/button';
type FlashCardProps = {
  title: string;
  text: string;
  isOpen?: boolean;
  closeable?: boolean;
  onClose?: () => void;
  actionText?: string;
  actionIcon?: JSX.Element;
  onClickAction?: () => void;
  children?: React.ReactNode;
};

export const FlashCard = ({
  title,
  text,
  isOpen = true,
  closeable = false,
  onClose,
  children,
  actionText,
  actionIcon,
  onClickAction,
}: FlashCardProps) => {
  const [showFlash, setShowFlash] = useState(isOpen);

  const openFlash = () => {
    setShowFlash(true);
  };
  const onClickActionButton = () => {
    if (onClickAction) onClickAction();
  };

  const closeFlash = () => {
    setShowFlash(false);
    if (onClose) {
      onClose();
    }
  };

  return showFlash ? (
    <div
      id="dropdown-cta"
      className="p-4 mt-6 rounded-none border-2 border-blue-600 bg-blue-50 dark:bg-blue-900"
      role="alert"
    >
      <div className="flex items-center mb-3">
        <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
          {title}
        </span>
        {closeable && (
          <Button
            nativeType="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
            onClick={closeFlash}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <XIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
      <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">{text}</p>
      {actionText && actionIcon ? (
        <Button
          onClick={onClickActionButton}
          icon={actionIcon}
          className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {actionText}
        </Button>
      ) : (
        <Button
          onClick={onClickActionButton}
          className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {actionText}
        </Button>
      )}
      {children && children}
    </div>
  ) : null;
};

export default FlashCard;
