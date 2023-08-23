// export enum LoginStatus {
//   LOGGED_IN = 'logged-in',
//   LOG_IN_ERROR = 'log-in-error',
//   VERIFYING_LOG_IN = 'verifying-log-in',
//   LOGGING_IN = 'logging-in',
//   LOGGED_OUT = 'logged-out',
// }

export enum AuthStatus {
  AUTHENTICATED = 'authenticated',
  AUTH_ERROR = 'auth-error',
  AUTH_SUCCESS = 'auth-success',
  VERIFYING_AUTH = 'verifying-auth',
  AUTHENTICATING = 'authenticating',
  LOGGED_OUT = 'logged-out',
}

export type PinInputProps = {
  authStatus: AuthStatus; // (status: string) => void
  id: string;
  pinLength: number;
  onSuccess?: () => void;
  onVerify: (pin: string) => Promise<boolean>;
};

export type PinProps = {
  focused: boolean;
  value: string | undefined;
};

//Path: src/components/form/pin-input/types.ts
