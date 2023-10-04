import React, { createContext, useContext, useState } from 'react';
import useWizard from './hooks/useWizard';

type WizardContextType = {
  isCurrentStepValid: boolean;
  setValidationStatus: (status: boolean) => void;
  goToNextStep?: () => void;
};

export const WizardContext = createContext<WizardContextType | undefined>(
  undefined,
);

export const useWizardContext = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }
  return context;
};
type WizardProviderProps = {
  children: React.ReactNode;
  goToNextStep?: () => void;
};
export const WizardProvider = ({
  children,
  goToNextStep,
}: WizardProviderProps) => {
  const [isCurrentStepValid, setIsCurrentStepValid] = useState<boolean>(false);

  const setValidationStatus = (status: boolean) => {
    setIsCurrentStepValid(status);
  };
  // const { goToNextStep } = useWizard(steps, onFinish, onClose);

  return (
    <WizardContext.Provider
      value={{
        isCurrentStepValid,
        setValidationStatus,
        goToNextStep,
        // goToNextStep: defaultGoToNextStep,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
// Path: src/components/blocks/wizard/wizard-context.tsx
