import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup from './radio-group';
import { RadioOption } from './types';
const radioOptions: RadioOption[] = [
  {
    label: 'Boy',
    value: 'boy',
  },
  {
    label: 'Girl',
    value: 'girl',
  },
];
const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;
export const Default: Story = {
  name: 'RadioGroup',
  args: {
    name: 'name-radio-group',
    options: radioOptions,
  },
};
