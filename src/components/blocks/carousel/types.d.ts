import { inter } from '@/utils/fonts';
export type CarouselItem = {
  id: string;
  position?: number;
  media_url: string; // URL of the image or video
  caption?: string;
};
export type CarouselOptions = {
  autoplay?: boolean;
  autoplaySpeed?: number;
  interval?: number;
  indicators?: string;
  onNext?: () => void;
  onPrev?: () => void;
  onSlide?: () => void;
  onChange?: () => void;
};

export type CarouselProps = {
  items: CarouselItem[];
  options?: CarouselOptions;
};
