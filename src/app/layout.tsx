import { ReactNode } from 'react';
import { inter, roboto_mono } from '@/utils/fonts';
import { Metadata } from 'next';
import { AppProvider } from '@/providers/app';
import { SplashScreenWrapper } from '@/components/blocks/splash-screen';
import { defaultMetadata } from '@/utils/metadata-config';
import GlobalStyles from '@/components/GlobalStyles';
import '@/styles/globals.css';

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
//   require('@/testing/mocks/initialize');
// }

export const metadata: Metadata = defaultMetadata;

type Props = {
  children: ReactNode;
  pageProps: any;
};

// export default function RootLayout({ children }: { children: ReactNode & { getLayout?: (page: ReactNode) => ReactNode } }) {
//   const getLayout = children.getLayout || ((page: ReactNode) => page);

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

            {getLayout(children, pageProps)}
          </AppProvider>
        </SplashScreenWrapper>
      </body>
    </html>
  );
}
// src/app/layout.tsx
