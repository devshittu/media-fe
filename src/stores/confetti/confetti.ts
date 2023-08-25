import { delayWithCancel } from '@/utils';
import { createStore, useStore } from 'zustand';

export type PlayConfettiParams = {
  duration?: number;
  delay?: number;
};

export type ConfettiStore = {
  open: boolean;
  playConfetti: (params: PlayConfettiParams) => Promise<void>;
  stopConfetti: () => void;
};

export const confettiStore = createStore<ConfettiStore>((set) => ({
  open: false,
  playConfetti: async ({ duration = 5000, delay = 0 }: PlayConfettiParams) => {
    const { promise: delayPromise, cancel: cancelDelay } =
      delayWithCancel(delay);
    await delayPromise;
    set({ open: true });
    const { promise: durationPromise, cancel: cancelDuration } =
      delayWithCancel(duration);
    await durationPromise;
    set({ open: false });

    // Cancel the timeouts to clear them
    cancelDelay();
    cancelDuration();
  },
  stopConfetti: () => {
    set({ open: false });
  },
}));

export const useConfetti = () => useStore(confettiStore);

//Path: src/stores/confetti/confetti.ts
