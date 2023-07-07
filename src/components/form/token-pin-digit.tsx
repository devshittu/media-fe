import React, { useState, useRef, useEffect } from 'react';

type PinDigitProps = {
  focused: boolean;
  value: string | undefined;
};

function PinDigit({ focused, value }: PinDigitProps) {
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      const timeout = setTimeout(() => {
        // setHidden(true);
      }, 500);

      return () => {
        // setHidden(false);
        clearTimeout(timeout);
      };
    }
  }, [value]);

  const digitClasses = `app-pin-digit focused items-center h-20 w-14 inline-flex relative border-white/50x border-2 bg-white-600x rounded justify-center after:content-[''] after:shadow-md after:z-20 after:absolute before:content-[''] before:shadow-md before:z-20 before:absolute ${
    focused ? 'focused' : ''
  } ${hidden ? 'hidden' : ''}`;

  return (
    <div className={digitClasses}>
      <span className="app-pin-digit-value text-5xl m-0 p-0">
        {value || ''}
      </span>
    </div>
  );
}

type TokenPinInputFieldProps = {
  userLoginStatus: UserLoginStatus; // (status: string) => void
  id: string;
  pinLength: number;
};

export enum UserLoginStatus {
  LOGGED_IN = 'logged-in',
  LOG_IN_ERROR = 'log-in-error',
  VERIFYING_LOG_IN = 'verifying-log-in',
  LOGGING_IN = 'logging-in',
  LOGGED_OUT = 'logged-out',
}

function TokenPinInputField({
  userLoginStatus,
  pinLength = 4,
  id = 'app-pin-hidden-input',
}: TokenPinInputFieldProps) {
  const [pin, setPin] = useState('');
  const pinInputRef = useRef<HTMLInputElement>(null);
  const [userLoginState, setUserLoginState] =
    useState<UserLoginStatus>(userLoginStatus);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (
      userLoginState === UserLoginStatus.LOGGING_IN ||
      userLoginState === UserLoginStatus.LOG_IN_ERROR
    ) {
      pinInputRef.current?.focus();
    } else {
      setPin('');
    }
  }, [userLoginState]);

  useEffect(() => {
    const verifyPin = async (pin: string) => {
      try {
        setUserLoginState(UserLoginStatus.VERIFYING_LOG_IN);

        const verifyC = (pin: string) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (pin === '1234') {
                // if (rememberMe) setData(true); //Todo Add a remind me checkmark. and set it he localstorage.
                resolve(true);
              } else {
                reject(`Invalid pin: ${pin}`);
              }
            }, Math.floor(Math.random() * (700 - 300 + 1)) + 300);
          });
        };
        if (await verifyC(pin)) {
          setUserLoginState(UserLoginStatus.LOGGED_IN);
        }
      } catch (err) {
        console.error(err);
        setUserLoginState(UserLoginStatus.LOG_IN_ERROR);
      }
    };
    if (pin.length === pinLength) {
      verifyPin(pin);
    }

    if (userLoginStatus === UserLoginStatus.LOG_IN_ERROR) {
      setUserLoginState(UserLoginStatus.LOG_IN_ERROR);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= pinLength) {
      const newPin = e.target.value.substring(0, pinLength);
      setPin(newPin);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handlePinDigitClick = () => {
    pinInputRef.current?.focus();
  };

  const handleCancelClick = () => {
    setUserLoginState(UserLoginStatus.LOGGED_OUT);
  };

  return (
    <div className="absolutex z-30 opacity-0x left-[50%] top-[50%] pointer-events-auto app-pin-wrapper space-y-3">
      <label htmlFor={id} className="hidden">
        Pin
      </label>
      <input
        className="bg-transparent border-none ring-0 h-0 absolute w-0"
        disabled={
          userLoginState !== UserLoginStatus.LOGGING_IN &&
          userLoginState !== UserLoginStatus.LOG_IN_ERROR
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
        onClick={handlePinDigitClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handlePinDigitClick();
          }
        }}
      >
        {[...Array(pinLength)].map((_, index) => (
          <PinDigit
            key={index}
            focused={pin.length === index}
            value={pin[index]}
          />
        ))}
      </div>
      <h1>
        {'Enter the "1234" '}
        <button
          onClick={handleCancelClick}
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Cancel
        </button>
      </h1>

      <div className="flex items-center">
        <input
          id="link-checkbox"
          type="checkbox"
          checked={rememberMe}
          onChange={handleRememberMeChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="link-checkbox" className="ml-2 font-medium">
          Remember me{' '}
        </label>
      </div>
    </div>
  );
}

export default TokenPinInputField;

//Path: src/components/form/token-pin-digit.tsx
