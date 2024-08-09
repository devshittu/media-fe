'use client';
import React, { createContext, useState } from 'react';

type NavContextProps = {
  isNavOpen: boolean;
  setIsNavOpen: (isNavOpen: boolean) => void;
  lockScroll: boolean;
  setLockScroll: (lockScroll: boolean) => void;
  value?: string;
  bodyClass?: string;
  setBodyClass: (bodyClass: string) => void;
  scrollContainerRef?: React.RefObject<HTMLBodyElement>; // Pass the scrollContainerRef as a prop
};

export const NavContext = createContext<NavContextProps>({
  isNavOpen: false,
  setIsNavOpen: () => {},
  value: '',
  bodyClass: '',
  setBodyClass: () => {},
  lockScroll: false,
  setLockScroll: () => {},
});

export type NavProviderProps = {
  children?: React.ReactNode;
};

export const NavProvider = ({ children }: NavProviderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [lockScroll, setLockScroll] = useState(false);
  const [value, setValue] = useState('');
  const [bodyClass, setBodyClass] = useState('');

  return (
    <NavContext.Provider
      value={{
        isNavOpen,
        setIsNavOpen,
        value,
        bodyClass,
        setBodyClass,
        lockScroll,
        setLockScroll,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
