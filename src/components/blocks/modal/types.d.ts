export type ModalProps = {
  id: string;
  isActive: boolean;
  title: string;
  children?: React.ReactNode;
  size?: 'small' | 'default' | 'large' | 'full';
  noOverlay?: boolean;
  onClose?: () => void;
};

export type ModalClassProps = Omit<ModalProps, 'isActive'> & {
  isActive?: boolean;
};
