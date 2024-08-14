'use client';
import React, { ReactNode, useEffect, Suspense } from 'react';
import { ThemeProvider } from 'next-themes';
import { NavProvider, BodyStyleUpdater } from '@/components/blocks/nav/';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IS_DEVELOPMENT } from '@/config/constants';
import { CategoriesProvider } from '@/features/categories/hooks';
import { Notifications } from '@/components/notifications';
import { GlobalPopup } from '@/components/blocks/popup';
import { Tour } from '@/components/blocks/tour';
import { ConfettiEffect } from '@/components/confetti';
import { useInitializeStore } from '@/hooks';
import { CookieConsent } from '@/components/blocks/cookie-consent';
import { GlobalBanner } from '@/components/blocks/banner';
import { AnalyticsSyncWrapper } from '@/features/analytics/components';
import { Loading } from '@/components/loading';

type AppProviderProps = {
  children: ReactNode;
  theme?: string;
};

export const AppProvider = ({ children, theme }: AppProviderProps) => {
  // Initialize the Zustand store with default settings when the App component mounts
  useInitializeStore();

  return (
    <ThemeProvider attribute="class" forcedTheme={theme || undefined}>
      <NavProvider>
        <BodyStyleUpdater />
        <Notifications />
        <QueryClientProvider client={queryClient}>
          {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
          <CategoriesProvider>
            <GlobalBanner />
            <AnalyticsSyncWrapper />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <GlobalPopup />
            <Tour />
            <CookieConsent />
          </CategoriesProvider>
        </QueryClientProvider>
        <ConfettiEffect />
      </NavProvider>
    </ThemeProvider>
  );
};
// Path: src/providers/app.tsx
