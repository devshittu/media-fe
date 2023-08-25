export type Navigation = {
  icon: React.ReactElement;
  onClick: () => void;
  title?: string;
  disabled?: boolean;
  show?: boolean;
};
export type NavigationButtonProps = {
  icon: React.ReactElement;
  disabled?: boolean;
  onClick: () => void;
};
