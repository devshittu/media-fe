export type SplashLoaderProps = {
  id?: string;
  isActive: boolean;
  onExit?: () => void;
  onShow?: () => void;
  children?: React.ReactNode;
};

export type SplashLoaderClassProps = Omit<SplashLoaderProps, 'isActive'> & {
  isActive?: boolean;
};
