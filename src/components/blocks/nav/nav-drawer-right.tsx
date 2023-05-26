import React, { useContext, useState } from 'react';
import { NavContext, NavDrawerProps } from './index';

export const NavDrawerRight = ({ title, children }: NavDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { setIsNavOpen } = useContext(NavContext);

  const toggleSidebar = () => {
    const openStatus = !isOpen;
    setIsOpen(openStatus);
    setIsNavOpen(openStatus);
  };

  return (
    <>
      <button
        type="button"
        className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Navigation</span>
        <svg width="24" height="24">
          <path
            d="M5 6h14M5 12h14M5 18h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
      {/* Overlay background */}
      <div
        className={`fixedx inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 z-50 w-full h-screen overflow-y-hidden ${
          isOpen
            ? 'fixed top-0 bottom-0 left-0 right-0 overflow-y-hidden'
            : 'hidden '
        }`}
        id="headlessui-dialog-overlay-:r4:"
        aria-hidden="true"
        data-headlessui-state="open"
        onClick={toggleSidebar}
      ></div>
      {/* The drawer body */}

      <section
        id="drawer-right-example"
        className={`fixed top-0 right-0 z-[1001] h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-slate-800 ${
          isOpen ? 'transform-none' : '-translate-x-full '
        }`}
        tabIndex={-1}
        aria-labelledby="drawer-right-label"
      >
        <h5
          id="drawer-right-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-slate-500 dark:text-slate-400"
        >
          <svg
            className="w-5 h-5 mr-2"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          Right drawer
          {title ? title : 'Menu'}
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-right-example"
          aria-controls="drawer-right-example"
          className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white"
          onClick={toggleSidebar}
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
          <span className="sr-only">Close menu</span>
        </button>

        {/* The drawer body */}
        <section className="overflow-y-auto">
          {children ? children : <p>Drawer body undefined </p>}
        </section>
      </section>
    </>
  );
};
