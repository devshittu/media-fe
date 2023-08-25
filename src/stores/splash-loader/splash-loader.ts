import { delayWithCancel } from '@/utils';
import { createStore, useStore } from 'zustand';

export type SplashLoaderStore = {
  open: boolean;
  playSplashLoader: (options?: PlaySplashLoaderOptions) => void;
  stopSplashLoader: () => void;
};

type PlaySplashLoaderOptions = {
  duration?: number;
  delay?: number;
  initialVisit?: boolean;
};

export const splashLoaderStore = createStore<SplashLoaderStore>((set) => ({
  open: false,
  playSplashLoader: async (options: PlaySplashLoaderOptions = {}) => {
    const { duration = 2000, delay = 0, initialVisit = false } = options;

    if (initialVisit && sessionStorage.getItem('visited')) {
      return; // Skip if it's an initial visit and the session flag is already set
    }

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

    if (initialVisit) {
      sessionStorage.setItem('visited', 'true');
    }
  },
  stopSplashLoader: () => {
    set({ open: false });
  },
}));

export const useSplashLoader = () => useStore(splashLoaderStore);

//Path: src/stores/splash-loader/splash-loader.ts
