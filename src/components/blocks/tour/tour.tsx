import React, { useState } from 'react';
import TourSequence from './tour-sequence';
import { TourPopperType } from './tour-popper';
import { TourSequenceItem } from './types';
import { useTour } from '@/stores/tour';

// type TourProps = {
//   sequence: TourSequenceItem[];
//   open: boolean;
//   onClose: () => void;
//   type: TourPopperType;
// };
// export const Tour = ({ sequence, open, onClose, type }: TourProps) => {
export const Tour = () => {
  const { sequence, open, type, closeTour } = useTour();
  return (
    <>
      {/* <div className={`transition-opacity ${open ? 'animate-fade-in' : 'opacity-0'}`}> */}
      {open && (
        <TourSequence
          sequence={sequence}
          open={open}
          onClose={closeTour}
          type={type}
        />
      )}
      {/* </div> */}
    </>
  );
};

// Path: src/components/blocks/tour/tour.tsx
