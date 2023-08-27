import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselProps } from './index';
import { CarouselItem, CarouselOptions } from './types';
const CarouselItems: CarouselItem[] = [
  {
    id: '1',
    media:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=470&amp;q=10',
    caption: '1 ',
  },
  {
    id: '2',
    media:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=399&q=10',
    caption: '2 ',
  },
];

const CarouselOption: CarouselOptions = {
  // autoplay: true,
  // autoplaySpeed: 3000,
  onNext: () => {
    console.log('Next slide');
  },
  onPrev: () => {
    console.log('Previous slide');
  },
  // onSlide: () => {
  //   console.log('Slide changed');
  // },
  // onChange: () => {
  //   console.log('Active slide changed');
  // },
};
const meta: Meta<typeof Carousel> = {
  title: 'Components/Blocks/Carousel',
  component: Carousel,
};
export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  name: 'Carousel Default',
  args: {
    items: CarouselItems,
    options: CarouselOption,
  },
};
