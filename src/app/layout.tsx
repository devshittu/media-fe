import { ReactNode, Suspense } from 'react';
import { inter, roboto_mono } from '@/utils/fonts';
import { Metadata, Viewport } from 'next';
import { AppProvider } from '@/providers/app';
import { SplashScreenWrapper } from '@/components/blocks/splash-screen';
import { defaultMetadata, defaultViewport } from '@/utils/metadata-config';
import GlobalStyles from '@/components/GlobalStyles';
import '@/styles/globals.css';
import AppWideLoader from '@/components/loading/app-wide-loader';
import { Loading } from '@/components/loading';
import RouteChangeHandler from '@/components/loading/RouteChangeHandler';
// if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
//   require('@/testing/mocks/initialize');
// }

export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = defaultViewport;

type Props = {
  children: ReactNode;
  pageProps: any;
};

export default function RootLayout({ children, pageProps }: Props) {
  const getLayout =
    (children as any).type?.getLayout || ((page: ReactNode) => page);
  return (
    <html lang="en">
      <head>
        <GlobalStyles />
      </head>
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <SplashScreenWrapper>
          <AppProvider>
            {/* {getLayout(children)} */}

            <AppWideLoader />
            <RouteChangeHandler />
            {/* Wrap children in Suspense */}
            {/* <Suspense fallback={<Loading />}> */}
            {getLayout(children, pageProps)}
            {/* </Suspense> */}
          </AppProvider>
        </SplashScreenWrapper>
      </body>
    </html>
  );
}
// src/app/layout.tsx
