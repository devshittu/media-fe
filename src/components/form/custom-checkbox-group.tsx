import React, { useState } from 'react';
import { CustomCheckbox } from './custom-checkbox';

export type Option = {
  id: string;
  label: string;
  description: string;
  displayComponentProps?: any; // Additional props for the DisplayComponent
};

type CustomCheckboxGroupProps = {
  options: Option[];
  onChange: (selectedOptions: Option[]) => void;
  DisplayComponent?: React.ComponentType<any>; // DisplayComponent prop type
  displayComponentProps?: any; // Additional props for the DisplayComponent
};

export const CustomCheckboxGroup: React.FC<CustomCheckboxGroupProps> = ({
  options,
  onChange,
  DisplayComponent,
  displayComponentProps, // Additional props for the DisplayComponent
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleCheckboxChange = (option: Option, isChecked: boolean) => {
    let updatedOptions: Option[];

    if (isChecked) {
      // Add the selected option
      updatedOptions = [...selectedOptions, option];
    } else {
      // Remove the deselected option
      updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption.id !== option.id,
      );
    }

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <ul className="grid w-full gap-6 md:grid-cols-3">
      {options.map((option) => {
        const {
          id,
          label,
          description,
          displayComponentProps: optionDisplayComponentProps = {},
        } = option;

        const mergedDisplayComponentProps = {
          id,
          label,
          description,
          ...optionDisplayComponentProps,
          ...displayComponentProps,
        };

        return (
          <CustomCheckbox
            key={option.id}
            id={option.id}
            label={option.label}
            description={option.description}
            isChecked={selectedOptions.some(
              (selectedOption) => selectedOption.id === option.id,
            )}
            onChange={(isChecked) => handleCheckboxChange(option, isChecked)}
            DisplayComponent={DisplayComponent} // Pass DisplayComponent prop
            displayComponentProps={mergedDisplayComponentProps} // Pass merged displayComponentProps
          />
        );
      })}
      {selectedOptions.map((s) => s.label + ', ')}
    </ul>
  );
};

export default CustomCheckboxGroup;

// import React, { useState } from 'react';
// import { CustomCheckbox } from './custom-checkbox';

// export type Option = {
//   id: string;
//   label: string;
//   description: string;
//   displayComponentProps?: any;
// };

// type CustomCheckboxGroupProps = {
//   options: Option[];
//   onChange: (selectedOptions: Option[]) => void;
//   DisplayComponent?: React.ComponentType<any>; // DisplayComponent prop type
//   displayComponentProps?: any; // Additional props for the DisplayComponent
// };

// const CustomCheckboxGroup: React.FC<CustomCheckboxGroupProps> = ({
//   options,
//   onChange,
//   DisplayComponent,
//   displayComponentProps, // Additional props for the DisplayComponent
// }) => {
//   const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

//   const handleCheckboxChange = (option: Option, isChecked: boolean) => {
//     let updatedOptions: Option[];

//     if (isChecked) {
//       // Add the selected option
//       updatedOptions = [...selectedOptions, option];
//     } else {
//       // Remove the deselected option
//       updatedOptions = selectedOptions.filter(
//         (selectedOption) => selectedOption.id !== option.id,
//       );
//     }

//     setSelectedOptions(updatedOptions);
//     onChange(updatedOptions);
//   };

//   return (
//     <ul className="grid w-full gap-6 md:grid-cols-3">
//       {options.map((option) => {
//         const {
//           displayComponentProps: optionDisplayProps,
//           ...restOptionProps
//         } = option;
//         const mergedDisplayProps = {
//           ...displayComponentProps,
//           ...optionDisplayProps,
//         };

//         return (
//           <CustomCheckbox
//             key={option.id}
//             {...restOptionProps}
//             isChecked={selectedOptions.some(
//               (selectedOption) => selectedOption.id === option.id,
//             )}
//             onChange={(isChecked) => handleCheckboxChange(option, isChecked)}
//             DisplayComponent={DisplayComponent} // Pass DisplayComponent prop
//             displayComponentProps={mergedDisplayProps} // Pass merged displayComponentProps
//           />
//         );
//       })}
//       {selectedOptions.map((s) => s.label + ', ')}
//     </ul>
//   );
// };

// export default CustomCheckboxGroup;
