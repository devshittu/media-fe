import React from 'react';
import { motion, MotionProps, AnimatePresence } from 'framer-motion';
import { animationPresets } from './animation-presets';

interface CustomMotionComponentProps extends MotionProps {
  children: React.ReactNode;
  preset?: keyof typeof animationPresets;
  customProps?: Partial<MotionProps>;
  className?: string;
  id?: string;
}

const CustomMotionComponentInner: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CustomMotionComponentProps
> = ({ children, preset, customProps, ...motionProps }, ref) => {
  const presetProps = React.useMemo(() => {
    return preset ? animationPresets[preset]() : {};
  }, [preset]);

  const combinedProps = React.useMemo(() => {
    return { ...presetProps, ...customProps };
  }, [presetProps, customProps]);

  return (
    <motion.div ref={ref} {...motionProps} {...combinedProps}>
      {children}
    </motion.div>
  );
};

export const CustomMotionComponent = React.memo(
  React.forwardRef(CustomMotionComponentInner),
);
CustomMotionComponent.displayName = 'CustomMotionComponent';

interface AnimateAndPresenceComponentProps extends MotionProps {
  children: React.ReactNode;
  preset?: keyof typeof animationPresets;
  customProps?: Partial<MotionProps>;
  isPresent: boolean;
  key?: React.Key; // Unique key for AnimatePresence
  className?: string;
  id?: string;
}

const AnimateAndPresenceComponentInner: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AnimateAndPresenceComponentProps
> = ({ children, preset, customProps, isPresent, ...motionProps }, ref) => {
  const presetProps = React.useMemo(() => {
    return preset ? animationPresets[preset]() : {};
  }, [preset]);

  const combinedProps = React.useMemo(() => {
    return { ...presetProps, ...customProps };
  }, [presetProps, customProps]);

  return (
    <AnimatePresence>
      {isPresent && (
        <motion.div key={'modal'} ref={ref} {...motionProps} {...combinedProps}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AnimateAndPresenceComponent = React.memo(
  React.forwardRef(AnimateAndPresenceComponentInner),
);
AnimateAndPresenceComponent.displayName = 'AnimateAndPresenceComponent';

// Path: src/components/animations/AnimateAndPresenceComponent.tsx
