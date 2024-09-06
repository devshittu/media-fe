import { Metadata, Viewport } from 'next';

export const defaultMetadata: Metadata = {
  title: {
    default: 'Media App',
    template: '%s | Media App',
  },
  description:
    'Media App is a Next.js starter kit for building a media streaming app',
  // viewport:
  //   'width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1',
  icons: {
    icon: [
      { rel: 'icon', url: '/favicon.ico', type: 'image/x-icon' },
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
        sizes: '180x180',
      },
      {
        rel: 'icon',
        url: '/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
      { rel: 'manifest', url: '/site.webmanifest' },
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Media App',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.gong.ng/',
    siteName: 'Media App',
  },
  twitter: {
    card: 'summary_large_image',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'verification_code',
    yandex: 'verification_code',
  },
};

export const defaultViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

// Path: src/utils/metadata-config.ts
