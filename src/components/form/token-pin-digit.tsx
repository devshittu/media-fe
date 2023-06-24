import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

type PinDigitProps = {
  value: string;
  focused: boolean;
};

function PinDigit(props: PinDigitProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (props.value) {
      const timeout = setTimeout(() => {
        setHidden(true);
      }, 500);

      return () => {
        setHidden(false);
        clearTimeout(timeout);
      };
    }
  }, [props.value]);

  return (
    <div
      className={`app-pin-digit focused items-center h-20 w-14 inline-flex relative border-slate-900/50 dark:border-white/50 border-2 bg-white-600 justify-center after:content-[''] after:shadow-md after:z-20 after:absolute before:content-[''] before:shadow-md before:z-20 before:absolute ${
        props.focused ? 'focused' : ''
      } ${hidden ? 'hidden' : ''}`}
    >
      <span className="app-pin-digit-value text-5xl m-0 p-0">
        {props.value || ''}
      </span>
    </div>
  );
}

type TokenPinInputFieldProps = {
  setUserStatus: UserLoginStatus; // (status: string) => void
};

export enum UserLoginStatus {
  LOGGED_IN = 'logged-in',
  LOG_IN_ERROR = 'log-in-error',
  VERIFYING_LOG_IN = 'verifying-log-in',
  LOGGING_IN = 'logging-in',
  LOGGED_OUT = 'logged-out',
}

const TokenPinInputField = ({ setUserStatus }: TokenPinInputFieldProps) => {
  const [userLoginState, setUserLoginState] =
    useState<UserLoginStatus>(setUserStatus);
  const [pin, setPin] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const tokenInputFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      userLoginState === UserLoginStatus.LOGGING_IN ||
      userLoginState === UserLoginStatus.LOG_IN_ERROR
    ) {
      tokenInputFieldRef.current?.focus();
    } else {
      setPin('');
    }
  }, [userLoginState]);

  const verify = async () => {
    try {
      setUserLoginState(UserLoginStatus.VERIFYING_LOG_IN);

      const verifyC = (pin: string) => {
        return new Promise<boolean>((resolve, reject) => {
          setTimeout(() => {
            if (pin === '1234') {
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

  useEffect(() => {
    if (pin.length === 4) {
      verify();
    }

    if (userLoginState === UserLoginStatus.LOG_IN_ERROR) {
      setUserLoginState(UserLoginStatus.LOG_IN_ERROR);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 4) {
      setPin(e.target.value.toString());
    }
  };

  const handleOnChangeRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleOnClick = () => {
    tokenInputFieldRef.current?.focus();
  };

  const handleOnCancel = () => {
    setUserLoginState(UserLoginStatus.LOGGED_OUT);
  };
  // Todo: remove the 'x' in the class names
  return (
    <div className="app-pin-wrapper absolutex z-50 opacity-0x left-[50%] top-[50%] pointer-events-auto space-y-3 ">
      <input
        className="bg-transparent border-none ring-0 h-0 absolute w-0"
        disabled={
          userLoginState !== UserLoginStatus.LOGGING_IN &&
          userLoginState !== UserLoginStatus.LOG_IN_ERROR
        }
        id="app-pin-hidden-input"
        maxLength={4}
        ref={tokenInputFieldRef}
        type="number"
        value={pin}
        onChange={handleOnChange}
      />

      {/* //Todo add the useKeyPress hook */}
      <div
        role="button"
        tabIndex={0}
        className="flex gap-2"
        onClick={handleOnClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleOnClick();
          }
        }}
      >
        <PinDigit focused={pin.length === 0} value={pin[0]} />
        <PinDigit focused={pin.length === 1} value={pin[1]} />
        <PinDigit focused={pin.length === 2} value={pin[2]} />
        <PinDigit focused={pin.length === 3} value={pin[3]} />
      </div>
      <h1>
        {' Enter the "1234"'}
        <Link
          href="#"
          onClick={() => setUserLoginState(UserLoginStatus.LOGGED_OUT)}
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Cancel
        </Link>
      </h1>

      <div className="flex items-center">
        <input
          id="link-checkbox"
          type="checkbox"
          checked={rememberMe}
          onChange={handleOnChangeRememberMe}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="link-checkbox" className="ml-2 font-medium">
          Remember me
        </label>
      </div>
    </div>
  );
};

export default TokenPinInputField;

//Path: src/components/form/token-pin-digit.tsx
