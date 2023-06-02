import { useState } from 'react';
import Checkbox from './checkbox';
import { CheckboxGroupProps, CheckboxOption } from './types';

const CheckboxGroup = ({ options, onChange }: CheckboxGroupProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  

  const handleCheckboxChange = (option: CheckboxOption) => {
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[option.value] = !newCheckedItems[option.value];
    setCheckedItems(newCheckedItems);
    console.log('newCheckedItems', newCheckedItems);
    setSelectedOption(Object.keys(newCheckedItems).filter((key) => newCheckedItems[key]));

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

      <p>
        Selected option: <strong>{selectedOption}</strong>
      </p>
    </div>
  );
};

export default CheckboxGroup;
