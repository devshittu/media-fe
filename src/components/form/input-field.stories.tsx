import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './input-field';

const meta: Meta<typeof InputField> = {
  title: 'Components/Forms/InputField',
  component: InputField,
};
export default meta;

type Story = StoryObj<typeof InputField>;
export const Default: Story = {
  name: 'Input Field',
  args: {
    name: 'name',
    showLabel: true,
    id: 'id',
    className: 'custom-class',
    disabled: false,
    error: { message: 'Required field!' },
    placeholder: 'Name',
    outlined: true,
    rounded: false,
    size: 'base',
    type: 'text',
    required: true,
    value: '',
  },
};
