import { PlusIcon, Icon, MailIcon } from '../illustrations';
import type { Meta, StoryObj } from '@storybook/react';
import CheckboxGroup from './checkbox-group';
import { CheckboxOption } from './types';
const checkboxOptions: CheckboxOption[] = [
  {
    label: 'Tall',
    value: 'tall',
  },
  {
    label: 'Taller',
    value: 'taller',
  },
  {
    label: 'Tallest',
    value: 'tallest',
  },
];
const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/Forms/CheckboxGroup',
  component: CheckboxGroup,
};
export default meta;

type Story = StoryObj<typeof CheckboxGroup>;
export const Default: Story = {
  name: ' CheckboxGroup',
  args: {
    options: checkboxOptions,
    onChange: () => {
      console.log('Checkbox');
    },
  },
};
