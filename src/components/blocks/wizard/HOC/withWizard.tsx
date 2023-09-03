import React from 'react';
import useWizard from '../hooks/useWizard';
import { WizardContext, WizardProvider, useWizardContext } from '../wizard-context';  // Make sure to import WizardContext

// export const withWizard = (Component: React.ComponentType<any>) => {
//   const WithWizard = (props: any) => {
//     const { steps, onFinish, onClose } = props;
//     const { goToNextStep } = useWizard(steps, onFinish, onClose);
//     const { isCurrentStepValid, setValidationStatus } = useWizardContext(); // Use the existing context

//     return (
//       <WizardContext.Provider value={{ goToNextStep, isCurrentStepValid, setValidationStatus }}>
//         <Component {...props} />
//       </WizardContext.Provider>
//     );
//   };

//   WithWizard.displayName = `WithWizard(${getDisplayName(Component)})`;

//   return WithWizard;
// };
// This is your HOC
export const withWizard = (Component: React.ComponentType<any>) => {
  const WithWizard = (props: any) => {
    const { steps, onFinish, onClose } = props;
    const { goToNextStep } = useWizard(steps, onFinish, onClose);

    return (
      <WizardProvider goToNextStep={goToNextStep}>
        <Component {...props} />
      </WizardProvider>
    );
  };

  WithWizard.displayName = `WithWizard(${getDisplayName(Component)})`;

  return WithWizard;
};


// Helper function to get the display name of a component
function getDisplayName(Component: React.ComponentType<any>) {
  return Component.displayName || Component.name || 'Component';
}

// Path: src/components/blocks/wizard/HOC/withWizard.tsx