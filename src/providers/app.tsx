import { ReactNode } from 'react';

type AppProviderProps = {
  children: ReactNode;
  theme?: string;
};

export const AppProvider = ({ children, theme }: AppProviderProps) => {
  return <>{children}</>;
};
