import { useStepValidation } from '@/components/blocks/wizard/hooks';
import { StepProps } from '@/components/blocks/wizard/types';
import React, { useEffect } from 'react';

export const Finish = ({ onValidationStatusChange }: StepProps) => {
  const validate = () => true;

  // const isValid = useStepValidation(validate, [], onValidationStatusChange);

  return (
    <div>
      {`Thanks for joining us! 🎉 You're headed to your homepage, but don't fret—a quick tour will pop up to guide your adventure through the news world. Happy exploring!`}
      <h1 className='font-serif text-6xl'>Happy Exploring!</h1>
    </div>
  );
};

//Path: src/features/auth/components/signup-flow/finish.tsx
