import { useWizardStepValidation } from '@/components/blocks/wizard/hooks';
import { StepProps } from '@/components/blocks/wizard/types';
import { UserSuggestionList } from '@/features/users/components';
import Image from 'next/image';
import React from 'react';

export const Channels = ({ onValidationStatusChange }: StepProps) => {
  useWizardStepValidation();
  return (
    <>
      <div className="flex-grow ">
        <UserSuggestionList
          numSuggestions={4}
          className="grid h-full max-w-2xl gap-x-4 md:gap-x-10 lg:gap-x-14 grid-cols-1  md:grid-cols-2 mx-auto "
        />
      </div>
    </>
  );
};

//Path: src/features/auth/components/signup-flow/channels.tsx
