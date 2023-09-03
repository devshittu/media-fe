import { AnalogSwitchItem } from './analog-switch-item';
import React from 'react';
export type AnalogSwitchOptionProps = {
  title: string;
  value: string;
  selectedValue?: string;
  onSelect: (value: string) => void;
};

export const AnalogSwitchOption = ({
  title,
  value,
  selectedValue,
  onSelect,
}: AnalogSwitchOptionProps) => {
  const isSelected = value === selectedValue;

  return (
    <AnalogSwitchItem
      title={title}
      isSelected={isSelected}
      onClick={() => onSelect(value)}
      icon={<div>{title}</div>} // this can be adjusted, maybe a dropdown arrow or something else
      ariaLabel={title}
    />
  );
};
