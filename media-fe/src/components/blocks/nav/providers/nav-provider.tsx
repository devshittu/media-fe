import React, { createContext, useState } from 'react';

type NavContextProps = {
  isNavOpen: boolean;
  setIsNavOpen: (isNavOpen: boolean) => void;
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
});

export type NavProviderProps = {
  children?: React.ReactNode;
};

export const NavProvider = ({ children }: NavProviderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
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
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
