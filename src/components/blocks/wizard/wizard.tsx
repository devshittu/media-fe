import React from 'react';
import { WizardProps } from './types';
import { WizardProvider, useWizardContext } from './wizard-context';
import WizardComponent from './wizard-component';
import { withWizard } from './HOC/withWizard';

const Wizard = ({ steps, onFinish, onClose, requiresSession }: WizardProps) => {
  return (
    <WizardProvider>
      <WizardComponent steps={steps} onFinish={onFinish} onClose={onClose}  requiresSession={requiresSession} />
    </WizardProvider>
  );
};

export default Wizard; // Import the HOC

// const EnhancedWizardComponent = withWizard(WizardComponent);

// const Wizard = ({ steps, onFinish, onClose }: WizardProps) => {
//   return (
//     <EnhancedWizardComponent steps={steps} onFinish={onFinish} onClose={onClose} />
//   );
// };

// export default Wizard;

//path: src/components/blocks/wizard/wizard.tsx
