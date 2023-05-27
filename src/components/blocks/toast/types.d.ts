export type ToastProps = {
  id?: string;
  type: 'success' | 'danger' | 'warning';
  position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
  message: string;
  duration?: number;
  onClose?: () => void;
};
