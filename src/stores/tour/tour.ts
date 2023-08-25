import { TourPopperType } from '@/components/blocks/tour/tour-popper';
import { TourSequenceItem } from '@/components/blocks/tour/types';
import { createStore, useStore } from 'zustand';
import { delayWithCancel } from '@/utils';

export type ShowTourParams = {
  sequence: TourSequenceItem[];
  type?: TourPopperType;
  delay?: number;
};

export type TourStore = {
  sequence: TourSequenceItem[];
  open: boolean;
  type: TourPopperType;
  showTour: (params: ShowTourParams) => Promise<void>;
  closeTour: () => void;
};

export const tourStore = createStore<TourStore>((set) => ({
  sequence: [],
  open: false,
  type: TourPopperType.INFO,
  showTour: async ({ sequence, type, delay = 0 }: ShowTourParams) => {
    const { promise: delayPromise, cancel: cancelDelay } =
      delayWithCancel(delay);

    await delayPromise;
    set({ sequence, open: true, type: type ?? TourPopperType.INFO });

    // Cancel the timeouts to clear them
    cancelDelay();
  },
  closeTour: () => {
    set({ sequence: [], open: false });
  },
}));

export const useTour = () => useStore(tourStore);

//Path: src/stores/tour/tour.ts
