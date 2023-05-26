import React, { useState } from 'react';

type ModalProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'default' | 'large' | 'full';
};

export const Modal = ({
  id,
  size = 'default',
  title,
  children,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
    document.documentElement.style.overflow = '';
  };
  return (
    <>
      <button
        data-modal-target={id}
        data-modal-toggle={id}
        className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={openModal}
      >
        {title}
      </button>

      {/* Overlay background */}

      <div
        className={`inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 z-50 w-full h-screen overflow-y-hidden ${
          isOpen ? 'fixed top-0 bottom-0 left-0 right-0' : 'hidden '
        }`}
        id={`${id}-dialog-overlay`}
        aria-labelledby={`${id}-label`}
        aria-hidden="true"
        data-modal-state={`${isOpen ? 'open' : 'close'}`}
      ></div>

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
          <div className="relative bg-white rounded-lg shadow dark:bg-slate-700">
            <div
              className={`flex items-center justify-between  p-5 border-b rounded-t dark:border-slate-600`}
            >
              <h3 className="text-xl font-medium text-slate-900 dark:text-white">
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
    </>
  );
};
