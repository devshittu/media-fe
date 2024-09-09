'use client';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SelectField, SelectFieldProps } from './select-field';

type HookFormSelectFieldProps = Omit<SelectFieldProps, 'onChange' | 'value'> & {
  name: string;
  control?: any;
  rules?: any;
};

export const HookFormSelectField: React.FC<HookFormSelectFieldProps> = ({
  name,
  control,
  rules,
  ...props
}) => {
  const formContext = useFormContext();
  const effectiveControl = control || formContext?.control;

  if (!effectiveControl) {
    throw new Error(
      'HookFormSelectField must be used within a FormProvider or passed a control prop',
    );
  }

  return (
    <Controller
      name={name}
      control={effectiveControl}
      rules={rules}
      render={({ field, fieldState }) => (
        <SelectField
          {...field} // Pass value, onChange, etc.
          {...props}
          error={fieldState.error} // Handle validation errors
        />
      )}
    />
  );
};

// Path: src/components/form/hook-form-select-field.tsx
