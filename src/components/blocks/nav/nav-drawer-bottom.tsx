import React, { useContext, useState } from 'react';
import { NavContext, NavDrawerProps } from './index';
import {
  Icon,
  MoreHorizontalIcon,
  ShareIcon,
  XIcon,
} from '@/components/illustrations';

export const NavDrawerBottom = ({ id, title, children }: NavDrawerProps) => {
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
        <Icon icon={<MoreHorizontalIcon />} useBackground size={32} />
      </button>
      {/* Overlay background */}
      <div
        className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 w-full h-screen overflow-y-hidden ${
          isOpen ? 'fixed' : 'hidden '
        }`}
        aria-hidden="true"
        onClick={toggleSidebar}
      ></div>

      {/* The drawer body */}
      <section
        id="drawer-bottom-example"
        className={`fixed bottom-0 left-0 right-0 z-30 w-full p-4 overflow-y-auto transition-transform bg-white dark:bg-slate-800 ${
          isOpen ? 'transform-none' : 'translate-y-full '
        }`}
        tabIndex={-1}
        aria-labelledby="drawer-bottom-label"
      >
        <header>
          <h5
            id="drawer-bottom-label"
            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
          >
            <ShareIcon className="w-5 h-5 mr-2" strokeWidth={2.5} />
            {title ? title : 'Undefined Title'}
          </h5>
          <button
            type="button"
            data-drawer-hide="drawer-bottom-example"
            aria-controls="drawer-bottom-example"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Close menu</span>
            <XIcon
              className="w-5 h-5 text-slate-900 dark:text-slate-100"
              strokeWidth={2.5}
            />
          </button>
        </header>
        <section className="max-w-lg mb-6 text-sm text-slate-500 dark:text-slate-400">
          {children ? children : <p>Drawer body undefined</p>}
        </section>
        <footer></footer>
      </section>
    </>
  );
};
