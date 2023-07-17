import { AppProvider } from '@/providers/app';
import '@/styles/globals.css';
import { inter, roboto_mono } from '@/utils/fonts';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

//MSW wrapping
import dynamic from 'next/dynamic';
import { API_MOCKING } from '@/config/constants';
import { MSWWrapperProps } from '@/lib/msw';

const MSWWrapper = dynamic<MSWWrapperProps>(() =>
  import('@/lib/msw').then(({ MSWWrapper }) => MSWWrapper),
);
if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  require('@/testing/mocks/initialize')
}


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const pageContent = getLayout(<Component {...pageProps} />);

  return (
    <>
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
      <AppProvider>
        {/* {API_MOCKING ? <MSWWrapper>{pageContent}</MSWWrapper> : pageContent} */}
        {pageContent}
      </AppProvider>
    </>
  );
};
export default App;
