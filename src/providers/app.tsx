import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { NavProvider, BodyStyleUpdater } from '@/components/blocks/nav/';

type AppProviderProps = {
  children: ReactNode;
  theme?: string;
};

export const AppProvider = ({ children, theme }: AppProviderProps) => {
  return (
    <>
      <ThemeProvider attribute="class" forcedTheme={theme || undefined}>
        <NavProvider>
          <BodyStyleUpdater />
          {children}
        </NavProvider>
      </ThemeProvider>
    </>
  );
};
