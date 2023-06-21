import { useKeyPress } from '@/hooks';
import React, { useEffect, useState } from 'react';
import { ModalProps } from './types';
import Portal from '@/hoc/Portal';

export const ModalComponent = ({
  id,
  size = 'default',
  noOverlay = false,
  isActive = false,
  title,
  children,
  onClose,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(isActive);

  const escapePressed = useKeyPress('Escape');
  const sizeClassName = {
    small: 'max-w-md',
    default: 'max-w-lg',
    large: 'max-w-4xl',
    full: 'max-w-full',
  };
  const openModal = () => {
    setIsOpen(true);
    document.documentElement.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
    document.documentElement.style.overflow = '';
  };

  useEffect(() => {
    if (isActive) {
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    if (escapePressed) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escapePressed]);

  return (
    <>
      <Portal wrapperId="modal-wrapper">
        {/* Overlay background */}

        {!noOverlay && (
          <div
            className={`inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 z-50 w-full h-screen overflow-y-hidden ${
              isOpen ? 'fixed top-0 bottom-0 left-0 right-0' : 'hidden '
            }`}
            id={`${id}-dialog-overlay`}
            aria-labelledby={`${id}-label`}
            aria-hidden="true"
            data-modal-state={`${isOpen ? 'open' : 'close'}`}
          ></div>
        )}
        {/* Modal content */}
        <div
          id={id}
          tabIndex={-1}
          className={`fixed top-0 left-0 right-0 z-50 ${
            isOpen ? '' : 'hidden'
          } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full 
        ${
          size !== 'small' && size !== 'full'
            ? 'justify-center items-center flex '
            : ''
        }
        h-[calc(100%-1rem)]`}
          aria-labelledby={`${id}-label`}
        >
          <div
            className={`relative w-full mx-auto ${sizeClassName[size]} max-h-full`}
          >
            <div className="relative border-2 md:border-4 border-slate-700 dark:border-slate-300 shadow-lg shadow-slate-500 dark:shadow-slate-600 bg-slate-100 dark:bg-slate-700">
              <div
                className={`flex items-center justify-between  p-5 border-b rounded-t dark:border-slate-600`}
              >
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <button
                  type="button"
                  className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white"
                  data-modal-hide={id}
                  onClick={closeModal}
                >
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
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

// Path: /src/components/blocks/modal/modal-component.tsx
