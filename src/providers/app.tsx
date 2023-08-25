import { ReactNode, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { NavProvider, BodyStyleUpdater } from '@/components/blocks/nav/';
import RootLayout from '@/layouts/root-layout';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IS_DEVELOPMENT } from '@/config/constants';
import { CategoriesProvider } from '@/features/categories/hooks';
import { Notifications } from '@/components/notifications';
import { GlobalPopup } from '@/components/blocks/popup';
import { Tour } from '@/components/blocks/tour';
import { ConfettiEffect } from '@/components/confetti';
import SplashLoader from '@/components/blocks/splash-loader/splash-loader';
import { useInitialSplashLoader } from '@/components/blocks/splash-loader/hooks/useInitialSplashLoader';

type AppProviderProps = {
  children: ReactNode;
  theme?: string;
};

export const AppProvider = ({ children, theme }: AppProviderProps) => {
  useInitialSplashLoader();
  return (
    <>
      <ThemeProvider attribute="class" forcedTheme={theme || undefined}>
        <NavProvider>
          {/* <RootLayout> */}
          <BodyStyleUpdater />
          <Notifications />
          <QueryClientProvider client={queryClient}>
            {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}

            <CategoriesProvider>
              {children}
              <GlobalPopup />

              <Tour />
            </CategoriesProvider>
          </QueryClientProvider>

          {/* The confetti effect and Splash loader effect to make it available through out the app */}
          <ConfettiEffect />
          <SplashLoader />
          {/* </RootLayout> */}
        </NavProvider>
      </ThemeProvider>
    </>
  );
};

// Path: src/providers/app.tsx
