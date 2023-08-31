import { useWizardStepValidation } from '@/components/blocks/wizard/hooks';
import { StepProps } from '@/components/blocks/wizard/types';
import React, { useEffect } from 'react';

export const Finish = ({ onValidationStatusChange }: StepProps) => {
  useWizardStepValidation();
  return (
    <>
      <div>
        {`Thanks for joining us! 🎉 You're headed to your homepage, but don't fret—a quick tour will pop up to guide your adventure through the news world. Happy exploring!`}
        <h1 className="font-extrabold text-3xl md:text-6xl ">
          Happy{' '}
          <span className="text-cyan-600 dark:text-cyan-400"> Exploring!</span>
        </h1>
        {/* <h2 className="text-5xl md:text-8xl font-extrabold ">I build <span className="text-cyan-800 dark:text-cyan-400"> delightful products</span></h2> */}
      </div>
    </>
  );
};

//Path: src/features/auth/components/signup-flow/finish.tsx
