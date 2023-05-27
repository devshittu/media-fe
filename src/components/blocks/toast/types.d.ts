export type ToastProps = {
  id?: string;
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
