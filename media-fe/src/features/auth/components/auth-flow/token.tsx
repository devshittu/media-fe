import React, { useEffect, useState } from 'react';
import { useWizardStepValidation } from '@/components/blocks/wizard/hooks';
import { StepProps } from '@/components/blocks/wizard/types';
// import PinInput, { UserAuthStatus } from '@/components/form/token-pin-digit';
import PinInput from '@/components/form/pin-input/pin-input';
import { AuthStatus } from '@/components/form/pin-input/types';
import { Tag } from '@/components/blocks/tag';
import { Icon, InfoIcon } from '@/components/illustrations';
import { pluralize } from '@/utils';
import { Badge, BadgeSize, BadgeType } from '@/components/blocks/badge';
import { useToggle } from '@/hooks';
import { useTour } from '@/stores/tour';
import { TourPopperType } from '@/components/blocks/tour/tour-popper';

const trialCount = 3;
const warningThreshold = 1;

export const Token = ({ onValidationStatusChange }: StepProps) => {
  const [remainingAttempts, setRemainingAttempts] = useState(trialCount); // Initial attempts
  useWizardStepValidation();
  const verifyPin = async (pin: string): Promise<boolean> => {
    // Simulate a server call to verify the pin
    console.log('Verifying PIN...');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pin === '1234');
      }, 1000);
    });
  };

  const handleSuccess = () => {
    console.log('Pin verification successful!');
  };

  const handleNotify = (remainingAttempts: number) => {
    if (remainingAttempts <= warningThreshold) {
      console.error(`Warning: Only ${remainingAttempts} attempts remaining!`);
    } else {
      console.log(`Warning: Only ${remainingAttempts} attempts remaining!`);
    }
    setRemainingAttempts(remainingAttempts); // Update remaining attempts
  };

  return (
    <>
    <div className="flex flex-col text-slate-800 dark:text-slate-400 space-y-4 md:space-y-8 flex-grow">
      <div className=" justify-center">
        <PinInput
          id="auth-token"
          pinLength={4}
          authStatus={AuthStatus.AUTHENTICATING}
          onVerify={verifyPin}
          onSuccess={handleSuccess}
          maxAttempts={trialCount}
          warningThreshold={2} // Magic number for triggering warning
          onNotify={handleNotify} // Notification event handler
        />

        <h1
          className={`${
            remainingAttempts <= warningThreshold && 'text-red-600'
          }`}
        >
          {`You have ${remainingAttempts} ${pluralize(
            remainingAttempts,
            'attempt',
            'attempts',
          )} left.`}
        </h1>
      </div>
      <div className="text-xs md:text-sm">
        <InfoWithHint/>
      </div>
    </div>
    </>
  );
};


const InfoWithHint = () => {
  const { isVisible, toggleVisibility } = useToggle();
  const handleClick = () => {
    toggleVisibility();
  };

  return (
    <>
      <Badge
      id="show-hint-token"
        type={BadgeType.INFO}
        size={BadgeSize.LARGE}
        onClick={handleClick}
        rounded
        icon={<InfoIcon className="w-4 h-4 stroke-[3]" />}
      >
        <h2 className="font-bold text-base">Hint</h2>
      </Badge>
      <div className={`hint ${isVisible ? 'block' : 'hidden'} bg-sky-200 dark:bg-sky-800 p-2 rounded-sm mt-3`}>
        <p>
          A PIN or token has been sent to your email address. Please check
          your inbox or spam folder. It should arrive within the next 15
          minutes. Keep this page open until you receive it.
        </p>
        <p>
          <strong>Note:</strong> After three unsuccessful attempts, you will
          be prevented from requesting another token for 30 minutes.
        </p>
      </div>
    </>
  );
};


//Path: src/features/auth/components/auth-flow/token.tsx
