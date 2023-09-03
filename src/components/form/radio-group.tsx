import React, { useState } from 'react';
import { RadioGroupProps } from './types';
import Radio from './radio';
const RadioGroup = ({ name, defaultValue, options }: RadioGroupProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || '');

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div>
      {options.map((option) => (
        <Radio
          key={option.value}
          id={`${name}-${option.value}`}
          name={name}
          value={option.value}
          selectedValue={selectedOption}
          checked={selectedOption === option.value}
          disabled={option.disabled}
          onChange={() => handleOptionChange(option.value)}
        />
      ))}
      <p>
        Selected option: <strong>{selectedOption}</strong>
      </p>
    </div>
  );
};
export default RadioGroup;

// Path: src/components/form/radio-group.tsx
