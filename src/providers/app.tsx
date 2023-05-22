import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

type AppProviderProps = {
  children: ReactNode;
  theme?: string;
};

export const AppProvider = ({ children, theme }: AppProviderProps) => {
  return (
    <ThemeProvider attribute="class" forcedTheme={theme || undefined}>
      {children}
    </ThemeProvider>
  );
};
