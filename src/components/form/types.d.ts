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

type CheckboxGroupProps = {
  options: Option[];
  onChange?: (checkedItems: { [key: string]: boolean }) => void;
};
