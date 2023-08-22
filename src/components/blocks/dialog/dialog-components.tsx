import React, { useEffect, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Icon,
  SkipForwardIcon,
  XIcon,
} from '@/components/illustrations';
import { Popup, PopupContent, PopupTrigger, usePopupContext } from '../popup/';

import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContainer,
  DialogHeader,
  DialogOverlay,
} from './';
import { Button } from '@/components/button';
import { useId } from '@floating-ui/react';
import useWizard from '../wizard/hook/useWizard';
import WizardStep from '../wizard/wizard-step';
import { Navigation } from './types';

export const DialogSampleUsage = () => {
  const navigationItems: Navigation[] = [
    {
      icon: <ChevronLeftIcon />,
      title: 'Previous',
      onClick: () => {
        console.log('Clicked Previous');
      },
      disabled: false,
      show: true,
    },
    {
      icon: <SkipForwardIcon />,
      title: 'Skip',
      onClick: () => {
        console.log('Clicked Skip');
      },
      disabled: true,
      show: true,
    },
    {
      icon: <ChevronRightIcon />,
      title: 'Next',
      onClick: () => {
        console.log('Clicked Next');
      },
      disabled: false,
      show: true,
    },
  ];
  const { setOpen } = usePopupContext();
  const onClose = () => {
    return setOpen(false);
  };
  return (
    <Dialog>
      <DialogOverlay />
      <DialogContainer>
        <DialogHeader
          title={'Sample title'}
          subtitle={'subtitle'}
          onClose={onClose}
          navigationItems={navigationItems}
        />
        <DialogBody>
          {/* {children} */}
          Sample body
          {/* <PopupDialog/> */}
        </DialogBody>
      </DialogContainer>
    </Dialog>
  );
};

//Path: src/components/blocks/dialog/dialog-components.tsx
