import React, { useEffect, useRef, useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { Pin } from './pin';
import { PinInputStatus } from './types';

export type PinInputProps = {
  control: any;
  name: string;
  pinInputStatus: PinInputStatus;
  id?: string;
  pinLength?: number;
  error?: FieldError;
  disabled?: boolean;

  watch: (name?: string) => any;
};

const PinInput: React.FC<PinInputProps> = ({
  control,
  name,
  error,
  watch,
  pinInputStatus,
  id = 'app-pin-hidden-input',
  pinLength = 4,
}) => {
  const [pin, setPin] = useState('');
  const pinInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [pinInputState, setPinInputState] =
    useState<PinInputStatus>(pinInputStatus);

  const tokenValue = watch(name);
  // Set the pin state to the default value when the component mounts
  useEffect(() => {
    setPin(tokenValue);
  }, [tokenValue]);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPin = e.target.value.substring(0, pinLength);
    if (newPin.length <= pinLength) {
      setPin(newPin);
    }
  };

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
  useEffect(() => handleFocusBlur(), []);
  const handlePinClick = () => pinInputRef.current?.focus();

  useEffect(() => {
    if (
      pinInputState === PinInputStatus.AUTHENTICATING ||
      pinInputState === PinInputStatus.AUTH_ERROR
    ) {
      pinInputRef.current?.focus();
    }
  }, [pinInputState]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <div className="pin-wrapper">
              <label htmlFor={id} className="hidden">
                Pin
              </label>
              <input
                {...field}
                className="bg-transparent border-none ring-0 h-0 absolute w-0"
                disabled={
                  pinInputState !== PinInputStatus.AUTHENTICATING &&
                  pinInputState !== PinInputStatus.AUTH_ERROR
                }
                id={id}
                maxLength={pinLength}
                ref={pinInputRef}
                type="number"
                value={pin}
                onChange={(e) => {
                  handlePinChange(e);
                  field.onChange(e);
                }}
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
            </div>
          );
        }}
      />

      {error && <div className="text-red-500 mt-2">{error.message}</div>}
    </>
  );
};

export default PinInput;

//Path: src/components/form/pin-input/pin-input.tsx
