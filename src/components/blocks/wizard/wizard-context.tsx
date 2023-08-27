import React, { createContext, useContext, useState } from 'react';

type WizardContextType = {
  isCurrentStepValid: boolean;
  setValidationStatus: (status: boolean) => void;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const useWizardContext = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }
  return context;
};
type WizardProviderProps = {
  children: React.ReactNode;
};
export const WizardProvider = ({ children }: WizardProviderProps) => {
  const [isCurrentStepValid, setIsCurrentStepValid] = useState<boolean>(false);

  const setValidationStatus = (status: boolean) => {
    setIsCurrentStepValid(status);
  };

  return (
    <WizardContext.Provider
      value={{
        isCurrentStepValid,
        setValidationStatus,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
// Path: src/components/blocks/wizard/wizard-context.tsx
