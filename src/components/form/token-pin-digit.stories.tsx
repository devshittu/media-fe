import type { Meta, StoryObj } from '@storybook/react';
import TokenPinInputField, { UserLoginStatus } from './token-pin-digit';

const meta: Meta<typeof TokenPinInputField> = {
  title: 'Components/Forms/TokenPinInputField',
  component: TokenPinInputField,
};
export default meta;

type Story = StoryObj<typeof TokenPinInputField>;
export const Default: Story = {
  name: 'TokenPinInputField',
  args: {
    userLoginStatus: UserLoginStatus.LOGGING_IN,
    pinLength: 4,
    id: 'token',
  },
};
