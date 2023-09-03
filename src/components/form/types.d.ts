export type CheckboxOption = {
  label: string;
  value: string;
};

export type CheckboxProps = {
  id: string;
  label: string;
  name?: string;
  showLabel?: boolean;
  checked?: boolean;
  disabled?: boolean;
  useAs?: 'bare' | 'button' | 'labelled';
  onChange?: (checked: boolean) => void;
  className?: string;
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
