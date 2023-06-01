import { useState } from 'react';
import Checkbox from './checkbox';
import { CheckboxGroupProps, CheckboxOption } from './types';

const CheckboxGroup = ({ options, onChange }: CheckboxGroupProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (option: CheckboxOption) => {
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[option.value] = !newCheckedItems[option.value];
    setCheckedItems(newCheckedItems);
    console.log('newCheckedItems', newCheckedItems);

    if (onChange) {
      onChange(newCheckedItems);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          checked={checkedItems[option.value] || false}
          onChange={() => handleCheckboxChange(option)}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;
//Path: src/components/form/checkbox-group.tsx:
