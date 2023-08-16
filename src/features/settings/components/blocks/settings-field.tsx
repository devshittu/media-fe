// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import Checkbox from '@/components/form/checkbox';
// import { InputField } from '@/components/form';

// type FieldProps = {
//   id: string;
//   fieldName: string;
//   fieldPlaceholder?: string;
//   register: ReturnType<typeof useForm>['register'];
//   formState: ReturnType<typeof useForm>['formState'];
// };

// const CheckboxField: React.FC<FieldProps> = ({ id, fieldName, register, formState }) => (
//   <Checkbox
//     id={id}
//     name={fieldName}
//     useAs="bare"
//     label="field"
//     error={formState.errors[fieldName]?.message}
//     {...register(fieldName, {
//       required: 'Required',
//     })}
//   />
// );

// const TextField: React.FC<FieldProps> = ({ id, fieldName, fieldPlaceholder, register, formState }) => (
//   <div className="lg:max-w-lg">
//     <InputField
//       id={id}
//       type="text"
//       placeholder={fieldPlaceholder}
//       name={fieldName}
//       error={formState.errors[fieldName]?.message}
//       {...register(fieldName, {
//         required: 'Required',
//       })}
//     />
//   </div>
// );

// const TextareaField: React.FC<FieldProps> = ({ id, fieldName, fieldPlaceholder, register, formState }) => (
//   <div className="lg:max-w-lg">
//     <InputField
//       id={id}
//       type="textarea"
//       placeholder={fieldPlaceholder}
//       name={fieldName}
//       label={fieldName}
//       error={formState.errors[fieldName]?.message}
//       {...register(fieldName, {
//         required: 'Required',
//       })}
//     />
//   </div>
// );

// type SettingsFieldProps = {
//   id: string;
//   title: string;
//   description?: string;
//   fieldType?: 'custom' | 'checkbox' | 'text' | 'textarea';
//   fieldName?: string;
//   fieldPlaceholder?: string;
//   children?: React.ReactNode;
// };

// export const SettingsField: React.FC<SettingsFieldProps> = ({
//   id,
//   title,
//   description,
//   fieldType = 'custom',
//   fieldName = '',
//   fieldPlaceholder = '',
//   children,
// }) => {
//   const { register, formState } = useForm();

//   let onSideFieldTypeComponent: React.ReactNode | null = null;
//   let onUnderFieldTypeComponent: React.ReactNode | null = null;

//   const sharedProps = {
//     id,
//     fieldName,
//     fieldPlaceholder,
//     register,
//     formState,
//   };

//   switch (fieldType) {
//     case 'checkbox':
//       onSideFieldTypeComponent = <CheckboxField {...sharedProps} />;
//       break;
//     case 'text':
//       onUnderFieldTypeComponent = <TextField {...sharedProps} />;
//       break;
//     case 'textarea':
//       onUnderFieldTypeComponent = <TextareaField {...sharedProps} />;
//       break;
//     default:
//       break;
//   }

//   return (
//     <div className="p-8 border-b border-slate-200 dark:border-slate-700">
//       <label
//         htmlFor={id}
//         className="flex items-center align-top justify-between text-slate-900 dark:text-white"
//       >
//         <h5 className="mb-2 text-2xl font-bold tracking-tight">{title}</h5>
//         <div className="flex items-center space-x-1">
//           {onSideFieldTypeComponent}
//         </div>
//       </label>
//       {description && (
//         <p className="mb-3 font-normal text-slate-700 dark:text-slate-400">
//           {description}
//         </p>
//       )}
//       <section className="text-slate-900 dark:text-slate-100">
//         {children ? children : <>{onUnderFieldTypeComponent}</>}
//       </section>
//     </div>
//   );
// };

// //Path src/features/settings/components/blocks/settings-field.tsx

import Checkbox from '@/components/form/checkbox';
import React from 'react';
import { SettingsFieldProps } from '../types';
import { InputField } from '@/components/form';
import { useForm } from 'react-hook-form';

interface FieldProps {
  id: string;
  fieldName: string;
  fieldPlaceholder?: string;
  register: ReturnType<typeof useForm>['register'];
  formState: ReturnType<typeof useForm>['formState'];
}

const CheckboxField: React.FC<FieldProps> = ({
  id,
  fieldName,
  register,
  formState,
}) => (
  <Checkbox
    id={id}
    useAs="bare"
    label="field"
    {...register(fieldName, {
      required: 'Required',
    })}
    name={fieldName}
    error={formState.errors[fieldName]?.message}
  />
);

const TextField: React.FC<FieldProps> = ({
  id,
  fieldName,
  fieldPlaceholder,
  register,
  formState,
}) => (
  <div className="lg:max-w-lg">
    <InputField
      id={id}
      type="text"
      placeholder={fieldPlaceholder}
      {...register(fieldName, {
        required: 'Required',
      })}
      name={fieldName}
      error={formState.errors[fieldName]?.message}
    />
  </div>
);

const TextareaField: React.FC<FieldProps> = ({
  id,
  fieldName,
  fieldPlaceholder,
  register,
  formState,
}) => (
  <div className="lg:max-w-lg">
    <InputField
      id={id}
      type="textarea"
      placeholder={fieldPlaceholder}
      label={fieldName}
      {...register(fieldName, {
        required: 'Required',
      })}
      name={fieldName}
      error={formState.errors[fieldName]?.message}
    />
  </div>
);

export const SettingsField: React.FC<SettingsFieldProps> = ({
  id,
  title,
  description,
  fieldType = 'custom',
  fieldName = '',
  fieldPlaceholder = '',
  children,
}) => {
  const { register, formState } = useForm();

  let onSideFieldTypeComponent: React.ReactNode | null = null;
  let onUnderFieldTypeComponent: React.ReactNode | null = null;

  switch (fieldType) {
    case 'checkbox':
      onSideFieldTypeComponent = (
        <CheckboxField
          id={id}
          fieldName={fieldName}
          register={register}
          formState={formState}
        />
      );
      break;
    case 'text':
      onUnderFieldTypeComponent = (
        <TextField
          id={id}
          fieldName={fieldName}
          fieldPlaceholder={fieldPlaceholder}
          register={register}
          formState={formState}
        />
      );
      break;
    case 'textarea':
      onUnderFieldTypeComponent = (
        <TextareaField
          id={id}
          fieldName={fieldName}
          fieldPlaceholder={fieldPlaceholder}
          register={register}
          formState={formState}
        />
      );
      break;
    default:
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

// Path src/features/settings/components/blocks/settings-field.tsx
