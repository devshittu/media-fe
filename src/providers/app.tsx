import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { NavProvider, BodyStyleUpdater } from '@/components/blocks/nav/';
import RootLayout from '@/layouts/root-layout';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IS_DEVELOPMENT } from '@/config/constants';
import { CategoriesProvider } from '@/features/categories/hooks';
import { Notifications } from '@/components/notifications';

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
          <Notifications />
          <QueryClientProvider client={queryClient}>
            {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}

            <CategoriesProvider>{children}</CategoriesProvider>
          </QueryClientProvider>
          {/* </RootLayout> */}
        </NavProvider>
      </ThemeProvider>
    </>
  );
};
