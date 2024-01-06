import type { Meta, StoryObj } from '@storybook/react';
import { SplashScreen } from './splash-screen';

const meta: Meta<typeof SplashScreen> = {
  title: 'Components/Blocks/Splash Screen ',
  component: SplashScreen,
};
export default meta;

type Story = StoryObj<typeof SplashScreen>;
export const Default: Story = {
  name: 'SplashScreen',
  args: {
    // children: 'SplashScreen',
    // isActive: true,
    id: 'splash-screen-container',
  },
};

// Path: src/components/blocks/splash-screen/splash-screen.stories.tsx