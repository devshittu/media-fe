import React, { useEffect, useRef, useState } from 'react';
import { AuthStatus, PinInputProps } from './types';
import { Pin } from './pin';
import { usePinVerification } from './hooks/usePinVerification';

export const PinInput = ({
  authStatus,
  pinLength = 4,
  id = 'app-pin-hidden-input',
  onSuccess,
  onVerify,
  maxAttempts = 3,
  warningThreshold, // Magic number prop
  onNotify, // Notification event handler
}: PinInputProps) => {
  if (warningThreshold && !onNotify) {
    throw new Error('onNotify must be provided if warningThreshold is set');
  }

  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const pinInputRef = useRef<HTMLInputElement>(null);
  const [rememberMe, setRememberMe] = useState(false);
  // Focus the input field when the component mounts
  useEffect(() => {
    pinInputRef.current?.focus();
  }, []);

  // Focus the input field when the pin is wiped
  useEffect(() => {
    if (pin === '') {
      pinInputRef.current?.focus();
    }
  }, [pin]);
  const { loading, error, userLoginState, setUserLoginState } =
    usePinVerification(
      pin,
      pinLength,
      authStatus,
      async () => {
        if (onVerify) {
          const isVerified = await onVerify(pin);
          if (isVerified) {
            setAttempts(0); // Reset attempts on successful verification
          } else {
            setAttempts((prev) => prev + 1); // Increment attempts on failed verification
          }
          return isVerified; // Return the verification result
        }
        return false; // Return false if onVerify is not provided
      },
      setPin,
      onSuccess,
    );

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= pinLength) {
      const newPin = e.target.value.substring(0, pinLength);
      setPin(newPin);
    }
  };

  useEffect(() => {
    if (attempts > 0 && attempts < maxAttempts) {
      onNotify?.(maxAttempts - attempts);
    }
  }, [attempts, maxAttempts, onNotify]);
  // const handleRememberMeChange = () => {
  //   setRememberMe(!rememberMe);
  // };

  const handlePinClick = () => {
    pinInputRef.current?.focus();
  };

  const handleCancelClick = () => {
    setUserLoginState(AuthStatus.LOGGED_OUT);
  };

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
          <Pin key={index} focused={pin.length === index} value={pin[index]} />
        ))}
      </div>

      {loading && <div className="text-blue-500">Verifying...</div>}
      {error && <div className="text-red-500">{error.message}</div>}
      {/* <h1>
        {'Enter the "1234" '}
        <button
          onClick={handleCancelClick}
          className="text-blue-600 hover:underline"
        >
          Cancel
        </button>
      </h1> */}
      {/* <div className="flex items-center">
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
