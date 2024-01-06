import React, { ReactNode } from 'react';
import withSplashScreen from './HOC/withSplashScreen';

interface SplashScreenWrapperProps {
  children: ReactNode;
}

export const SplashScreenWrapper: React.FC<SplashScreenWrapperProps> = ({
  children,
}) => {
  // Define a component that just renders its children
  const ChildrenComponent: React.FC<SplashScreenWrapperProps> = ({
    children,
  }) => <>{children}</>;

  // Now wrap the ChildrenComponent with the splash screen HOC
  const ChildrenWithSplash = withSplashScreen(ChildrenComponent);

  // Render the wrapped component with children
  return <ChildrenWithSplash>{children}</ChildrenWithSplash>;
};

export default SplashScreenWrapper;

// Path: src/components/blocks/splash-screen/splash-screen-wrapper.tsx