import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { NavProvider, BodyStyleUpdater } from '@/components/blocks/nav/';
import RootLayout from '@/layouts/root-layout';

type AppProviderProps = {
  children: ReactNode;
  theme?: string;
};

export const AppProvider = ({ children, theme }: AppProviderProps) => {
  return (
    <>
      <ThemeProvider attribute="class" forcedTheme={theme || undefined}>
        <NavProvider>
          {/* <RootLayout> */}
          <BodyStyleUpdater />
          {children}
          {/* </RootLayout> */}
        </NavProvider>
      </ThemeProvider>
    </>
  );
};
