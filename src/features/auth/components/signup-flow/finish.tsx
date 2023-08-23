import { useStepValidation } from '@/components/blocks/wizard/hooks';
import { StepProps } from '@/components/blocks/wizard/types';
import React, { useEffect } from 'react';

export const Finish = ({ onValidationStatusChange }: StepProps) => {
  const validate = () => true;

  // const isValid = useStepValidation(validate, [], onValidationStatusChange);

  return (
    <div>
      Thanks and show loader and tell them you will be taking them to the
      homepage. And and a quick tour will show them how to navigate the site.
      Step 7: Load to the home pageShow them around using the tour feature in
      the app
    </div>
  );
};

//Path: src/features/auth/components/signup-flow/finish.tsx
