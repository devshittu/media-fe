export type CarouselItem = {
  media: string; // URL of the image or video
  caption?: string;
};

export type CarouselProps = {
  items: CarouselItem[];
};
