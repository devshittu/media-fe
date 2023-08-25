import React from 'react';
import { WizardProps } from './types';
import { usePopupContext } from '../popup';
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContainer,
  DialogHeader,
  DialogOverlay,
} from '../dialog';
import { WizardProvider, useWizardContext } from './wizard-context';
import WizardComponent from './wizard-component';

const Wizard = ({ steps, onFinish, onClose }: WizardProps) => {
  const customAction = () => {
    console.log('onStepValid action is being run');
  };
  return (
    <WizardProvider handleNextClick={customAction}>
      <WizardComponent steps={steps} onFinish={onFinish} onClose={onClose} />
    </WizardProvider>
  );
};

export default Wizard;

//path: src/components/blocks/wizard/wizard.tsx
