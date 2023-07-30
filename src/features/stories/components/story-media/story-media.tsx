import React from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselOptions,
} from '@/components/blocks/carousel';

type StoryMediaProps = {
  carouselItems: CarouselItem[];
  carouselOptions: CarouselOptions;
};
//Todo: consider music, audio and video content
export const StoryMedia = ({
  carouselItems,
  carouselOptions,
}: StoryMediaProps) => {
  return (
    <div className="mb-8 w-full">
      <Carousel items={carouselItems} options={carouselOptions} />
    </div>
  );
};
//Path: src/features/stories/components/story-media/story-media.tsx
