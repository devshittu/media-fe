import Portal from '@/hoc/Portal';
import { useConfetti } from '@/stores/confetti';
import React from 'react';
import Confetti from 'react-confetti';

export const ConfettiEffect = () => {
  const { open, stopConfetti } = useConfetti();
  const handleConfettiComplete = () => {
    // You can call playConfetti with a duration of 0 to close the confetti
    stopConfetti();
  };

  return (
    <>
      {open && (
        <Portal>
          <Confetti
            style={{ zIndex: 9999 }}
            onConfettiComplete={handleConfettiComplete}
          />
        </Portal>
      )}
    </>
  );
};
//Path: src/components/confetti/confetti.tsx
