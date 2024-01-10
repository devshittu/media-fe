import { SplashScreenWrapper } from '@/components/blocks/splash-screen/';
import { AppProvider } from '@/providers/app';
import '@/styles/globals.css';
import { inter, roboto_mono } from '@/utils/fonts';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement, ReactNode } from 'react';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  require('@/testing/mocks/initialize');
}

type NextPageWithLayout = NextPage & {
  getLayout?: (
    page: ReactElement,
    layoutProps?: Record<string, any>,
  ) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const pageContent = (
    <>
      {getLayout(
        React.createElement(Component as React.ComponentType<any>, pageProps),
        pageProps,
      )}
    </>
  );

  return (
    <>
      <SplashScreenWrapper>
        <Head>
          <meta
            name="description"
            content="Media App is a Next.js starter kit for building a media streaming app"
          />
          <title>Media App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <style jsx global>
            {`
              :root {
                --inter-font: ${inter.style.fontFamily};
                --roboto-mono-font: ${roboto_mono.style.fontFamily};
              }
            `}
          </style>
        </Head>
        <AppProvider>{pageContent}</AppProvider>
      </SplashScreenWrapper>
    </>
  );
};
export default App;

// Path: media-fe/src/pages/_app.tsx
