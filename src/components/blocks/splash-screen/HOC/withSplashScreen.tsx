import React, { useEffect, useState } from 'react';
import { useSplashStore } from '../store/splash-screen-store';
import SplashScreen from '../splash-screen';

interface WithSplashScreenProps {
  children?: React.ReactNode;
}

const withSplashScreen = <P extends WithSplashScreenProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> => {
  const EnhancedComponent: React.FC<P> = (props: P) => {
    const [hasMounted, setHasMounted] = useState(false);
    const { hasShownSplash, setHasShownSplash } = useSplashStore();

    // Initialize loading to false and update it only after component mounts
    const [loading, setLoading] = useState(false);
    const [displayStyle, setDisplayStyle] = useState('block');

    useEffect(() => {
      setHasMounted(true); // Set the mounted flag after component mounts

      if (!hasShownSplash) {
        setLoading(true); // Now it's safe to show the splash screen
        setDisplayStyle('none'); // Hide the main content initially

        setTimeout(() => {
          setHasShownSplash(true);
          setLoading(false);
          setDisplayStyle('block'); // Reveal content after splash
        }, 2000); // Show splash for 2000ms
      }
    }, [hasShownSplash, setHasShownSplash]);

    // Prevent any state updates until after the component has mounted
    if (!hasMounted) {
      return null;
    }

    return (
      <>
        {loading && <SplashScreen />}
        <div style={{ display: displayStyle }}>
          {React.createElement<React.ComponentProps<typeof WrappedComponent>>(
            WrappedComponent,
            props,
          )}
        </div>
      </>
    );
  };

  EnhancedComponent.displayName = `WithSplashScreen(${getDisplayName(
    WrappedComponent,
  )})`;
  return EnhancedComponent;
};

function getDisplayName<P>(WrappedComponent: React.ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withSplashScreen;

// Path: src/components/blocks/splash-screen/HOC/withSplashScreen.tsx
