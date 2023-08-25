import React, { createContext, useContext, useState } from 'react';

type WizardContextType = {
  isCurrentStepValid: boolean;
  setValidationStatus: (status: boolean) => void;
  handleNextClick: () => void;
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
  handleNextClick: () => void;
};
export const WizardProvider = ({
  children,
  handleNextClick,
}: WizardProviderProps) => {
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);

  return (
    <WizardContext.Provider
      value={{
        isCurrentStepValid,
        setValidationStatus: setIsCurrentStepValid,
        handleNextClick,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
