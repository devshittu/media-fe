export type MarqueeItem = {
  id: string;
  title: string;
  description?: string;
  media?: string;
  children?: React.ReactNode;
};

export type MarqueeProps = {
  items?: MarqueeItem[];
  play?: boolean;
  children?: React.ReactNode;
  className?: string;
  hoverToPause?: boolean;
  loop?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
  scaleItems?: boolean;
  reverse?: boolean;
};
