README for the `<CustomCheckboxGroup />` and `<CustomCheckbox />` components, including various use cases and scenarios:

## CustomCheckboxGroup

The `CustomCheckboxGroup` component allows you to create a group of checkboxes with custom display components. It provides a flexible and customizable way to handle multiple selections.


### Usage

Here's an example of how to use the `CustomCheckboxGroup` component:

```tsx
import React from 'react';
import CustomCheckboxGroup from 'custom-checkbox-group';

const MyCheckboxGroup: React.FC = () => {
  const options = [
    { id: 'option1', label: 'Option 1', description: 'Description for Option 1' },
    { id: 'option2', label: 'Option 2', description: 'Description for Option 2' },
    { id: 'option3', label: 'Option 3', description: 'Description for Option 3' },
  ];

  const handleCheckboxGroupChange = (selectedOptions: Option[]) => {
    // Handle selected options logic
    console.log('Selected Options:', selectedOptions);
  };

  return (
    <CustomCheckboxGroup options={options} onChange={handleCheckboxGroupChange} />
  );
};

export default MyCheckboxGroup;
```

In this example, we define an array of `options` that includes the `id`, `label`, and `description` for each checkbox option. We also provide a callback function `handleCheckboxGroupChange` to handle the selected options.

### Props

The `CustomCheckboxGroup` component accepts the following props:

- `options` (required): An array of objects representing the checkbox options. Each object should have `id`, `label`, and `description` properties.
- `onChange` (required): A callback function that receives the selected options as an array when the selection changes.
- `DisplayComponent`: (optional) A custom display component to render for each checkbox option. This allows you to customize the appearance and behavior of each checkbox. The component will receive the option's properties as props, along with the `checked` prop indicating whether the checkbox is selected or not.
- `displayComponentProps`: (optional) Additional props to pass to the `DisplayComponent`. These props can be used to customize the behavior or appearance of the custom display component.

### Custom Display Component

You can customize the display of each checkbox option by providing a `DisplayComponent` to the `CustomCheckboxGroup`. This allows you to create a custom layout or style for each checkbox.

Here's an example of how to use a custom display component:

```tsx
import React from 'react';
import CustomCheckboxGroup from 'custom-checkbox-group';

const CustomCheckboxDisplay: React.FC<Option & { checked: boolean }> = ({
  id,
  label,
  description,
  checked,
}) => {
    const handleClick = () => {
      const optionExists = selectedOptions.some((option) => option.id === id);

      let newSelectedOptions: Option[];

      if (optionExists) {
        newSelectedOptions = selectedOptions.filter(
          (option) => option.id !== id,
        );
      } else {
        newSelectedOptions = [...selectedOptions, { id, label, description }];
      }

      setSelectedOptions(newSelectedOptions);
      console.log(newSelectedOptions);
    };

  return (
    <div className={`custom-checkbox ${checked ? 'checked' : ''}`} 
        onClick={handleClick}>
      <input type="checkbox" id={id} checked={checked} readOnly />
      <label htmlFor={id} >{label}</label>
      <p>{description}</p>
    </div>
  );
};

const MyCheckboxGroup: React.FC = () => {
  // ...

  return (
    <CustomCheckboxGroup
      options={options}
      onChange={handleCheckboxGroupChange}
      DisplayComponent={CustomCheckboxDisplay}
    />
  );
};

export default MyCheckboxGroup;
```

In this example, we create a custom display component called `CustomCheckboxDisplay`. It receives the `id`, `label`, `description`, and `checked` props. Inside the component, you can create your custom display layout using these props. 
Note: You must implement the onclick handler as shown above. Otherwise, the selected option will not be selected and updated automatically.

### Styling

The `CustomCheckboxGroup` component does not include any default styles. You can add your own styles to customize the appearance of the checkbox group and the custom display components. The class names or styles applied to the custom display components can be controlled within the custom display component itself.

## CustomCheckbox

The `CustomCheckbox` component provides a customizable checkbox input with a custom display component.



### Usage

Here's an example of how to use the `CustomCheckbox` component:

```tsx
import React, { useState } from 'react';
import CustomCheckbox from 'custom-checkbox';

const MyCheckbox: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
    // Handle checkbox change logic
    console.log('Checkbox is checked:', isChecked);
  };

  return (
    <CustomCheckbox
      isChecked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};

export default MyCheckbox;
```

In this example, we use the `useState` hook to manage the checkbox's `isChecked` state. We provide a callback function, `handleCheckboxChange`, to handle changes in the checkbox's state.

### Props

The `CustomCheckbox` component accepts the following props:

- `isChecked` (required): A boolean value indicating whether the checkbox is checked or not.
- `onChange` (required): A callback function that receives the new state of the checkbox when it changes.

### Custom Display

The `CustomCheckbox` component allows you to define a custom display component to render the checkbox. This gives you the flexibility to create a unique style or appearance for the checkbox.

To use a custom display component, pass it as the `DisplayComponent` prop to the `CustomCheckbox` component. The custom display component will receive the `isChecked` prop and an `onChange` prop, which

 can be used to handle changes to the checkbox state.

Here's an example of using a custom display component:

```tsx
import React, { useState } from 'react';
import CustomCheckbox from 'custom-checkbox';

const CustomCheckboxDisplay: React.FC<{ isChecked: boolean; onChange: (isChecked: boolean) => void }> = ({
  isChecked,
  onChange,
}) => {
  return (
    <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
      <input type="checkbox" checked={isChecked} onChange={(e) => onChange(e.target.checked)} />
      <label>{isChecked ? 'Checked' : 'Unchecked'}</label>
    </div>
  );
};

const MyCheckbox: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
    // Handle checkbox change logic
    console.log('Checkbox is checked:', isChecked);
  };

  return (
    <CustomCheckbox
      isChecked={isChecked}
      onChange={handleCheckboxChange}
      DisplayComponent={CustomCheckboxDisplay}
    />
  );
};

export default MyCheckbox;
```

In this example, we define a custom display component called `CustomCheckboxDisplay`. It receives the `isChecked` prop and the `onChange` prop, which are used to update the checkbox state.

### Styling

The `CustomCheckbox` component does not include any default styles. You can add your own styles to customize the appearance of the checkbox. The class names or styles applied to the custom display component can be controlled within the custom display component itself.

Feel free to customize the styles and behavior of the `CustomCheckboxGroup` and `CustomCheckbox` components according to your specific requirements and design preferences.