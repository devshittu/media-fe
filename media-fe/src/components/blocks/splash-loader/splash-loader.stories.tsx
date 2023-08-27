import type { Meta, StoryObj } from '@storybook/react';
import { SplashLoaderComponent } from './splash-loader-component';

const meta: Meta<typeof SplashLoaderComponent> = {
  title: 'Components/Blocks/Splash Loader ',
  component: SplashLoaderComponent,
};
export default meta;

type Story = StoryObj<typeof SplashLoaderComponent>;
export const Default: Story = {
  name: 'SplashLoaderComponent',
  args: {
    // children: 'SplashLoaderComponent',
    isActive: true,
    id: 'loader-container',
  },
};
