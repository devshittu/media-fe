import React, { useRef, useState } from 'react';
import { AuthStatus, PinInputProps } from './types';
import { Pin } from './pin';
import { usePinVerification } from './hooks/usePinVerification';

export const PinInput = ({
  authStatus,
  pinLength = 4,
  id = 'app-pin-hidden-input',
  onSuccess,
  onVerify,
}: PinInputProps) => {
  const [pin, setPin] = useState('');
  const pinInputRef = useRef<HTMLInputElement>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const { loading, error, userLoginState, setUserLoginState } =
    usePinVerification(pin, pinLength, authStatus, onVerify, setPin, onSuccess);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= pinLength) {
      const newPin = e.target.value.substring(0, pinLength);
      setPin(newPin);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

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
      <h1>
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
      </div>
    </div>
  );
};

export default PinInput;

//Path: src/components/form/pin-input/pin-input.tsx
