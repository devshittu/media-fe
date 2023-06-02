export type CheckboxOption = {
  label: string;
  value: string;
};

export type CheckboxProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  children?: React.ReactNode;
};

export type CheckboxGroupProps = {
  options: Option[];
  defaultValues?: Option[];
  onChange?: (checkedItems: { [key: string]: boolean }) => void;
};

export type RadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type RadioProps = {
  id: string;
  name: string;
  value: string;
  selectedValue?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type RadioGroupProps = {
  name: string;
  defaultValue?: string;
  options: RadioOption[];
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
};

// Path: src/components/form/types.d.ts
