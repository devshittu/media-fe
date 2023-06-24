export type NavDrawerProps = {
  id: string;
  active?: boolean;
  title: string;
  children: React.ReactNode;
};

export enum DrawerSide{
  BOTTOM = 'bottom',
  RIGHT = 'right',
  LEFT = 'left',
  TOP = 'top',
}

export type DrawerProps = {
  id: string;
  side: DrawerSide;
  isActive: boolean;
  title: string;
  titleIcon?: JSX.Element | React.ReactElement | null;
  children?: React.ReactNode;
  onClose?: () => void;
};

export type DrawerClassProps = Omit<DrawerProps, 'isActive'> & {
  isActive?: boolean;
};
