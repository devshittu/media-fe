'use client';
import { useEffect } from 'react';
import { useWizardContext } from '../wizard-context'; // Adjust the import path as needed

type ValidationFunction = () => boolean;

export const useWizardStepValidation = (validate?: ValidationFunction) => {
  const { setValidationStatus } = useWizardContext();

  useEffect(() => {
    const isValid = validate ? validate() : true;
    setValidationStatus(isValid);
    if (isValid) {
      //Todo: Debounce update of the data structure.
      console.log('onStepValid action is being run');
    }
  }, [validate, setValidationStatus]);
};

//Path: src/components/blocks/wizard/hooks/useStepValidation.ts
