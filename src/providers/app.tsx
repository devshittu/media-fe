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
import { useInitAuth, useInitializeStore } from '@/hooks';
import { CookieConsent } from '@/components/blocks/cookie-consent';
import { GlobalBanner } from '@/components/blocks/banner';
import { AnalyticsSyncWrapper } from '@/features/analytics/components';

type AppProviderProps = {
  children: ReactNode;
  theme?: string;
};

export const AppProvider = ({ children, theme }: AppProviderProps) => {
  useInitialSplashLoader();
  // Initialize the Zustand store with default settings when the App component mounts
  useInitializeStore();

  useInitAuth();

  // useAppInitialize();

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
              <GlobalBanner />

              {/* Now useAnalyticsSync will be called within a component that is a child of QueryClientProvider */}
              <AnalyticsSyncWrapper />
              {children}
              <GlobalPopup />

              <Tour />
              {/* <CookieConsent /> */}
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
