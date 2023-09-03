import { useState, useEffect } from 'react';
import { AuthStatus } from '../types';

export const usePinVerification = (
  pin: string,
  pinLength: number,
  authStatus: AuthStatus,
  onVerify: (pin: string) => Promise<boolean>,
  setPin: (pin: string) => void,
  onSuccess?: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | { message: string }>(null);
  const [userLoginState, setUserLoginState] = useState<AuthStatus>(authStatus);

  useEffect(() => {
    const verifyPin = async (pin: string) => {
      setLoading(true);
      try {
        setUserLoginState(AuthStatus.VERIFYING_AUTH);
        setError(null);
        const success = await onVerify(pin);

        if (success) {
          setUserLoginState(AuthStatus.AUTHENTICATED);
          onSuccess?.();
        } else {
          throw new Error('Verification failed');
        }
      } catch (err) {
        console.error(err);
        setUserLoginState(AuthStatus.AUTH_ERROR);
        setError({ message: `Invalid pin: ${pin}` });
      } finally {
        setLoading(false);
        setPin('');
      }
    };

    if (pin.length === pinLength) {
      verifyPin(pin);
    }

    if (authStatus === AuthStatus.AUTH_ERROR) {
      setUserLoginState(AuthStatus.AUTH_ERROR);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  return { loading, error, userLoginState, setUserLoginState, setError };
};

// Path: src/components/form/pin-input/hooks/usePinVerification.ts
