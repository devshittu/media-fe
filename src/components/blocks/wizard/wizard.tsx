import React from 'react';
import { WizardProps } from './types';
import { WizardProvider, useWizardContext } from './wizard-context';
import WizardComponent from './wizard-component';

const Wizard = ({ steps, onFinish, onClose }: WizardProps) => {
  return (
    <WizardProvider>
      <WizardComponent steps={steps} onFinish={onFinish} onClose={onClose} />
    </WizardProvider>
  );
};

export default Wizard;

//path: src/components/blocks/wizard/wizard.tsx
