import React, { useEffect, useRef, useState } from 'react';
import { AuthStatus, PinInputProps } from './types';
import { Pin } from './pin';
import { usePinVerification } from './hooks/usePinVerification';
import { ErrorText } from '@/components/labs';

const PinInput: React.FC<PinInputProps> = ({
  authStatus,
  pinLength = 4,
  id = 'app-pin-hidden-input',
  onSuccess,
  onVerify,
  maxAttempts = 3,
  warningThreshold,
  onNotify,
}) => {
  if (warningThreshold && !onNotify) {
    throw new Error('onNotify must be provided if warningThreshold is set');
  }

  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const pinInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const { loading, error, userLoginState, setUserLoginState } =
    usePinVerification(
      pin,
      pinLength,
      authStatus,
      async () => await handleVerify(),
      setPin,
      onSuccess,
    );

  // Handle focus and blur events
  useEffect(() => handleFocusBlur(), []);

  // Focus the input field when the component mounts and when the pin is wiped
  useEffect(() => {
    if (!pin || pin === '') {
      pinInputRef.current?.focus();
    }
  }, [pin]);

  // Notify when attempts are made
  useEffect(() => {
    if (attempts > 0 && attempts < maxAttempts) {
      onNotify?.(maxAttempts - attempts);
    }
  }, [attempts, maxAttempts, onNotify]);

  const handleFocusBlur = () => {
    const inputElement = pinInputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', () => setIsFocused(true));
      inputElement.addEventListener('blur', () => setIsFocused(false));
      return () => {
        inputElement.removeEventListener('focus', () => setIsFocused(true));
        inputElement.removeEventListener('blur', () => setIsFocused(false));
      };
    }
  };

  const handleVerify = async () => {
    if (onVerify) {
      const isVerified = await onVerify(pin);
      setAttempts(isVerified ? 0 : attempts + 1);
      return isVerified;
    }
    return false;
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPin = e.target.value.substring(0, pinLength);
    if (newPin.length <= pinLength) {
      setPin(newPin);
    }
  };

  const handlePinClick = () => pinInputRef.current?.focus();

  return (
    <div className="pin-wrapper">
      <label htmlFor={id} className="hidden">
        Pin
      </label>
      <input
        className="bg-transparent border-none ring-0 h-0 absolute w-0"
        disabled={
          userLoginState !== AuthStatus.AUTHENTICATING &&
          userLoginState !== AuthStatus.AUTH_ERROR
        }
        id={id}
        maxLength={pinLength}
        ref={pinInputRef}
        type="number"
        value={pin}
        onChange={handlePinChange}
      />
      <div
        role="button"
        title="token"
        tabIndex={0}
        className="flex gap-2"
        onClick={handlePinClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handlePinClick();
          }
        }}
      >
        {[...Array(pinLength)].map((_, index) => (
          <Pin
            key={index}
            focused={isFocused && pin.length === index}
            value={pin[index]}
          />
        ))}
      </div>
      {loading && <div className="text-blue-500">Verifying...</div>}
      {error && <ErrorText>{error.message}</ErrorText>}
      {/* <h1>
        {'Enter the "1234" '}
        <button
          onClick={handleCancelClick}
          className="text-blue-600 hover:underline"
        >
          Cancel
        </button>
      </h1>
     <div className="flex items-center">
        <input
          id="remember-checkbox"
          type="checkbox"
          checked={rememberMe}
          onChange={handleRememberMeChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="remember-checkbox" className="ml-2 font-medium">
          Remember me
        </label>
      </div> */}
    </div>
  );
};

export default PinInput;

//Path: src/components/form/pin-input/pin-input.tsx
