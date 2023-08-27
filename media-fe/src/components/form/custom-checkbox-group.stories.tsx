import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CustomCheckboxGroup from './custom-checkbox-group';
import { CustomCheckbox } from './custom-checkbox';

// Example icons for custom display
import { PlusIcon, Icon, MailIcon } from '../illustrations';

type CheckboxOption = {
  id: string;
  label: string;
  description: string;
};

const checkboxOptions: CheckboxOption[] = [
  {
    id: 'option1',
    label: 'Option 1',
    description: 'Description for Option 1',
  },
  {
    id: 'option2',
    label: 'Option 2',
    description: 'Description for Option 2',
  },
  {
    id: 'option3',
    label: 'Option 3',
    description: 'Description for Option 3',
  },
];

// CheckboxGroup stories
const checkboxGroupMeta: Meta<typeof CustomCheckboxGroup> = {
  title: 'Components/Forms/CustomCheckboxGroup',
  component: CustomCheckboxGroup,
};

export default checkboxGroupMeta;

type Story = StoryObj<typeof CustomCheckboxGroup>;

export const Default: Story = {
  name: 'CustomCheckboxGroup',
  args: {
    options: checkboxOptions,
    onChange: () => {
      console.log('CustomCheckbox');
    },
  },
};

const CustomDisplayComponent: React.FC<
  CheckboxOption & { checked: boolean }
> = ({ id, label, description, checked }) => {
  const handleClick = () => {
    //TODO: make the selection show on the custom display.
    //Todo reason been that it needs to be embedded in the component with the CustomCheckboxGroup
    //   const optionExists = selectedOptions.some((option) => option.id === id);
    //   let newSelectedOptions: CheckboxOption[];
    //   if (optionExists) {
    //     newSelectedOptions = selectedOptions.filter(
    //       (option) => option.id !== id,
    //     );
    //   } else {
    //     newSelectedOptions = [...selectedOptions, { id, label, description }];
    //   }
    //   setSelectedOptions(newSelectedOptions);
    //   console.log(newSelectedOptions);
  };

  return (
    <button
      className={`my-custom-checkbox ${checked ? 'checked' : ''}`}
      onClick={handleClick}
    >
      <p>ID: {id}</p>
      <p>Label: {label}</p>
      <p>Description: {description}</p>
    </button>
  );
};

export const WithCustomDisplay: Story = {
  name: 'With custom display',
  args: {
    options: checkboxOptions,
    onChange: () => {
      console.log('CustomCheckbox');
    },
    DisplayComponent: CustomDisplayComponent,
  },
};

//Path: src/components/form/checkbox-group.stories.tsx
