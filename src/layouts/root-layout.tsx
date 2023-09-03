import { SplashLoaderComponent } from '@/components/blocks/splash-loader';
import React, { ReactNode, useEffect, useState } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const stopAppLoading = () => setIsAppLoading(false);

    // Add event listener to stop app loading
    window.addEventListener('load', stopAppLoading);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('load', stopAppLoading);
    };
  }, []);

  return (
    <div>
      {isAppLoading ? (
        <SplashLoaderComponent isActive={isAppLoading} />
      ) : (
        // Render the children components
        children
      )}
    </div>
  );
};

export default RootLayout;
