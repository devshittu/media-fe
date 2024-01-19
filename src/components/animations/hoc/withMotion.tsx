import React from 'react';
import { motion, MotionProps } from 'framer-motion';

const withMotion = <P extends object>(
  Component: React.ElementType<P>,
  motionProps: MotionProps,
) => {
  const WrappedComponent: React.FC<P> = (props) => (
    <motion.div {...motionProps}>
      {React.createElement(Component, props)}
    </motion.div>
  );

  // Function to get the display name of a component
  const getDisplayName = (component: React.ElementType) => {
    return (
      (typeof component === 'string' && component) ||
      (component as React.ComponentType).displayName ||
      (component as React.ComponentType).name ||
      'Component'
    );
  };

  // Assign a display name for debugging purposes
  WrappedComponent.displayName = `WithMotion(${getDisplayName(Component)})`;

  return WrappedComponent;
};

export default withMotion;
// Path: src/components/animations/hoc/withMotion.tsx
