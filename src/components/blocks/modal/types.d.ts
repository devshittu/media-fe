export type ModalProps = {
  id: string;
  title: string;
  children?: React.ReactNode;
  size?: 'small' | 'default' | 'large' | 'full';
  noOverlay?: boolean;
  onClose?: () => void;
};
