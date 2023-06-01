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

// const OPTIONS = ['One', 'Two', 'Three'];

// const App = () => {
//   const [checkboxes, setCheckboxes] = useState(
//     OPTIONS.reduce((options, option) => ({
//       ...options,
//       [option]: false,
//     }), {})
//   );

//   const selectAllCheckboxes = (isSelected: boolean) => {
//     Object.keys(checkboxes).forEach((checkbox) => {
//       setCheckboxes((prevCheckboxes) => ({
//         ...prevCheckboxes,
//         [checkbox]: isSelected,
//       }));
//     });
//   };

//   const selectAll = () => selectAllCheckboxes(true);
//   const deselectAll = () => selectAllCheckboxes(false);

//   const handleCheckboxChange = (name: string) => {
//     setCheckboxes((prevCheckboxes) => ({
//       ...prevCheckboxes,
//       [name]: !prevCheckboxes[name],
//     }));
//   };

//   const handleFormSubmit = (formSubmitEvent: React.FormEvent) => {
//     formSubmitEvent.preventDefault();

//     Object.keys(checkboxes)
//       .filter((checkbox) => checkboxes[checkbox])
//       .forEach((checkbox) => {
//         console.log(checkbox, 'is selected.');
//       });
//   };

//   const createCheckbox = (option: string) => (
//     <Checkbox
//       label={option}
//       isSelected={checkboxes[option]}
//       onCheckboxChange={() => handleCheckboxChange(option)}
//       key={option}
//     />
//   );

//   const createCheckboxes = () => OPTIONS.map(createCheckbox);

//   return (
//     <div className="container">
//       <div className="row mt-5">
//         <div className="col-sm-12">
//           <form onSubmit={handleFormSubmit}>
//             {createCheckboxes()}

//             <div className="form-group mt-2">
//               <button
//                 type="button"
//                 className="btn btn-outline-primary mr-2"
//                 onClick={selectAll}
//               >
//                 Select All
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-outline-primary mr-2"
//                 onClick={deselectAll}
//               >
//                 Deselect All
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
