import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

type AppProviderProps = {
  children: ReactNode;
  theme?: string;
};

export const AppProvider = ({ children, theme }: AppProviderProps) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Media App is a Next.js starter kit for building a media streaming app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" forcedTheme={theme || undefined}>
        {children}
      </ThemeProvider>
    </>
  );
};
