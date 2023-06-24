export type NavDrawerProps = {
  id: string;
  active?: boolean;
  title: string;
  children: React.ReactNode;
};

export type DrawerProps = {
  id: string;
  isActive: boolean;
  title: string;
  titleIcon?: JSX.Element | React.ReactElement | null;
  children?: React.ReactNode;
  onClose?: () => void;
};

export type DrawerClassProps = Omit<DrawerProps, 'isActive'> & {
  isActive?: boolean;
};
