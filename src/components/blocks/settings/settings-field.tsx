// import Checkbox from '@/components/form/checkbox';
// import React from 'react';
// import { SettingsFieldProps } from './types';
// import { InputField } from '@/components/form';

// export const SettingsField = ({
//   id,
//   title,
//   description,
//   fieldType = 'checkbox',
//   fieldName = '',
//   fieldPlaceholder = '',
//   children,
// }: SettingsFieldProps) => {
//   const handleChange = (status: boolean) => {
//     console.log('status', status);
//   };
//   const fieldTypeCheckbox = (
//     <label
//       className="flex items-center align-top justify-between text-slate-900 dark:text-white"
//       htmlFor={id}
//     >
//       <h5 className="mb-2 text-2xl font-bold tracking-tight ">{title}</h5>
//       <div className="flex items-center space-x-1">
//         <Checkbox
//           id={id}
//           name={fieldName}
//           useAs="bare"
//           label="field"
//           onChange={handleChange}
//         />
//       </div>
//     </label>
//   );

//   const fieldTypeInput = (
//     <label
//       htmlFor={id}
//       className="flex items-center align-top justify-between text-slate-900 dark:text-white"
//     >
//       <h5 className="mb-2 text-2xl font-bold tracking-tight ">{title}</h5>
//     </label>
//   );

//   const fieldTypeGeneric = (
//     <div className="flex items-center align-top justify-between text-slate-900 dark:text-white">
//       <h5 className="mb-2 text-2xl font-bold tracking-tight ">{title}</h5>
//     </div>
//   );

//   const fieldInputText = (
//     <InputField
//       id={id}
//       type="text"
//       name={fieldName}
//       placeholder={fieldPlaceholder}
//     />
//   );
//   const fieldInputTextarea = (
//     <InputField
//       id={id}
//       type="textarea"
//       name={fieldName}
//       placeholder={fieldPlaceholder}
//     />
//   );

//   return (
//     <div className="p-8 border-b border-slate-200 dark:border-slate-700">
//       {fieldType === 'checkbox' && fieldTypeCheckbox}
//       {fieldType === 'custom' && fieldTypeGeneric}
//       {(fieldType === 'text' ||
//         fieldType === 'textarea' ||
//         fieldType === 'dropdown') &&
//         fieldTypeInput}
//       {description && (
//         <p className="mb-3 font-normal text-slate-700 dark:text-slate-400">
//           {description}
//         </p>
//       )}
//       <section className="text-slate-900 dark:text-slate-100">
//         {children ? (
//           children
//         ) : (
//           <>
//             {fieldType === 'text' && fieldInputText}
//             {fieldType === 'textarea' && fieldInputTextarea}
//           </>
//         )}
//       </section>
//     </div>
//   );
// };

import Checkbox from '@/components/form/checkbox';
import React, { useState } from 'react';
import { SettingsFieldProps } from './types';
import { FieldError, InputField } from '@/components/form';

export const SettingsField = ({
  id,
  title,
  description,
  fieldType = 'custom',
  fieldName = '',
  fieldPlaceholder = '',
  children,
}: SettingsFieldProps) => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<FieldError | null>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    // Example validation
    if (value.trim() === '') {
      setErrorMessage({ message: 'This field is required' });
    } else {
      setErrorMessage(null);
    }
  };
  const handleChange = (status: boolean) => {
    console.log('status', status);
  };

  let onSideFieldTypeComponent: JSX.Element | null;
  let onUnderFieldTypeComponent: JSX.Element | null;

  switch (fieldType) {
    case 'checkbox':
      onUnderFieldTypeComponent = null;
      onSideFieldTypeComponent = (
        <Checkbox
          id={id}
          name={fieldName}
          useAs="bare"
          label="field"
          onChange={handleChange}
        />
      );
      break;
    case 'text':
      onSideFieldTypeComponent = null;
      onUnderFieldTypeComponent = (
        <div className="lg:max-w-lg">
          <InputField
            id={id}
            type="text"
            value={inputValue}
            placeholder={fieldPlaceholder}
            name={fieldName}
            onChange={handleInputChange}
            error={errorMessage}
          />
        </div>
      );
      break;
    case 'textarea':
      onSideFieldTypeComponent = null;
      onUnderFieldTypeComponent = (
        <div className="lg:max-w-lg">
          <InputField
            id={id}
            type="textarea"
            value={inputValue}
            placeholder={fieldPlaceholder}
            name={fieldName}
            onChange={handleInputChange}
            error={errorMessage}
          />
        </div>
      );
      break;
    default:
      onSideFieldTypeComponent = null;
      onUnderFieldTypeComponent = null;
      break;
  }

  return (
    <div className="p-8 border-b border-slate-200 dark:border-slate-700">
      <label
        htmlFor={id}
        className="flex items-center align-top justify-between text-slate-900 dark:text-white"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight">{title}</h5>
        <div className="flex items-center space-x-1">
          {onSideFieldTypeComponent}
        </div>
      </label>
      {description && (
        <p className="mb-3 font-normal text-slate-700 dark:text-slate-400">
          {description}
        </p>
      )}
      <section className="text-slate-900 dark:text-slate-100">
        {children ? children : <>{onUnderFieldTypeComponent}</>}
      </section>
    </div>
  );
};
