import { PlusIcon, Icon, MailIcon } from '../illustrations';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story = {
  name: 'Primary button',
  args: {
    children: 'Primary Button',
  },
};
export const WithIcon: Story = {
  name: 'Button with icon',
  args: {
    children: 'Primary Icon',
    icon: <MailIcon />,
    type: 'primary',
    outlined: true,
  },
};
