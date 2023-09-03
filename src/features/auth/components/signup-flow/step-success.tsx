import { Button } from '@/components/button';
import React from 'react';

export const StepSuccess = ({
  completed,
  onContinue,
}: {
  completed?: boolean;
  onContinue?: () => void;
}) => {
  const handleClick = () => {
    console.log('OncontinueClick');
  };
  return (
    <section className={` flex-grow  ${completed ? 'action-completed' : ''}`}>
      <div className="container mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          {/* <h2 className="text-xs text-cyan-400 tracking-widest font-medium title-font mb-1">SETTINGS SAVED</h2> */}
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Settings Saved
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Your preferences have been saved click continue below or click the
            next button to continue.
          </p>
        </div>
        <div className="flex justify-center mt-12">
          <Button type={'primary'} size="large" onClick={handleClick}>
            Continue
          </Button>
        </div>
      </div>
    </section>
  );
};
