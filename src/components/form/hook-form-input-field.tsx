'use client';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputField, InputFieldPropTypes } from './input-field';

type HookFormInputFieldProps = Omit<
  InputFieldPropTypes,
  'onChange' | 'value'
> & {
  name: string;
  control?: any; // can be typed more strictly if needed
  rules?: any; // To pass validation rules from the form
};

export const HookFormInputField: React.FC<HookFormInputFieldProps> = ({
  name,
  control,
  rules,
  ...props
}) => {
  const formContext = useFormContext();
  const effectiveControl = control || formContext?.control;

  if (!effectiveControl) {
    throw new Error(
      'HookFormInputField must be used within a FormProvider or passed a control prop',
    );
  }

  return (
    <Controller
      name={name}
      control={effectiveControl}
      rules={rules} // Pass the validation rules
      render={({ field, fieldState }) => (
        <InputField
          {...field} // Pass value, onChange, etc.
          {...props}
          error={fieldState.error} // Handle validation errors
        />
      )}
    />
  );
};

// Path: src/components/form/hook-form-input-field.tsx
