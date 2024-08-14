// src/components/GlobalStyles.tsx
'use client';

import { inter, roboto_mono } from '@/utils/fonts';

const GlobalStyles = () => {
  return (
    <style jsx global>{`
      :root {
        --inter-font: ${inter.style.fontFamily};
        --roboto-mono-font: ${roboto_mono.style.fontFamily};
      }
    `}</style>
  );
};

export default GlobalStyles;
