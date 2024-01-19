import { useAnimation } from 'framer-motion';
import { animationPresets } from '../animation-presets';

export const useCustomAnimation = (preset: keyof typeof animationPresets) => {
  const controls = useAnimation();
  const presetAnimation = animationPresets[preset]();

  const triggerAnimation = async () => {
    await controls.start(presetAnimation.animate);
  };

  return { controls, triggerAnimation };
};

// Path: src/components/animations/hooks/useCustomAnimation.ts
