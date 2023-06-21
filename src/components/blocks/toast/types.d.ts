export type ToastProps = {
  id?: string;
  isActive: boolean;
  type: 'success' | 'danger' | 'warning';
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
  message: string;
  duration?: number;
  onClose?: () => void;
};

export type ToastClassProps = Omit<ToastProps, 'isActive'> & {
  isActive?: boolean;
};
