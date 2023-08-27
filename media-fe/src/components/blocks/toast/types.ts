export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export enum ToastPosition {
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_LEFT = 'bottom-left',
}

export type ToastProps = {
  id?: string;
  isActive: boolean;
  type: ToastType;
  position?: ToastPosition;
  message: string;
  duration?: number;
  onClose?: () => void;
};

export type ToastClassProps = Omit<ToastProps, 'isActive'> & {
  isActive?: boolean;
};
