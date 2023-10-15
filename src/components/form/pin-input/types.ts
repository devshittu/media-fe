export enum PinInputStatus {
  AUTHENTICATED = 'authenticated',
  AUTH_ERROR = 'auth-error',
  AUTH_SUCCESS = 'auth-success',
  VERIFYING_AUTH = 'verifying-auth',
  AUTHENTICATING = 'authenticating',
  LOGGED_OUT = 'logged-out',
}

export type PinInputProps = {
  control: any;
  name: string;
  pinInputStatus: PinInputStatus;
  id?: string;
  pinLength?: number;
};

export type PinProps = {
  focused: boolean;
  value: string | undefined;
};

//Path: src/components/form/pin-input/types.ts
