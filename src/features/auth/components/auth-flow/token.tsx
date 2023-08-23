import React, { useEffect } from 'react';
import { useStepValidation } from '@/components/blocks/wizard/hooks';
import { StepProps } from '@/components/blocks/wizard/types';
// import PinInput, { UserAuthStatus } from '@/components/form/token-pin-digit';
import PinInput from '@/components/form/pin-input/pin-input';
import { AuthStatus } from '@/components/form/pin-input/types';

export const Token = ({ onValidationStatusChange }: StepProps) => {
  // const validate = () => true;

  // const isValid = useStepValidation(validate, [], onValidationStatusChange);

  const verifyPin = async (pin: string): Promise<boolean> => {
    // Simulate a server call to verify the pin
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pin === '1234');
      }, 1000);
    });
  };

  const handleSuccess = () => {
    console.log('Pin verification successful!');
  };

  return (
    <div>
      <PinInput
        id="auth-token"
        pinLength={4}
        authStatus={AuthStatus.AUTHENTICATING}
        onVerify={verifyPin}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

//Path: src/features/auth/components/auth-flow/token.tsx
