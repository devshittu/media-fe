export const animationPresets = {
  fadeInScaleUp: () => ({
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3 },
  }),

  slideDown: () => ({
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
    transition: { type: 'spring', stiffness: 100, damping: 20, duration: 0.3 },
  }),

  // Add more presets as needed
};

// Path: src/components/animations/animationPresets.ts
