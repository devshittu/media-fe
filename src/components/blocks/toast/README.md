# Toast Class

The `Toast` class provides a simple way to display toast notifications in a web application.

## Usage

1. Install the required dependencies:

2. Import the `Toast` class in your JavaScript/TypeScript file:

```javascript
import Toast from './toast';
```

3. Create an instance of the Toast class with the desired configuration options:

```javascript
const toast = new Toast({
  message: 'Hello, world!',
  position: 'bottom-right',
  type: 'success',
  onClose: () => {
    // Handle close event
  },
  duration: 5000,
});
```

4. To display the toast notification, call the open() method:

```javascript
toast.open();
```

5. To close the toast, call the close() method:

```javascript
toast.close();
```

### Configuration Options

The Toast class accepts the following configuration options in the constructor:

- `message` (string, required): The message content of the toast notification.
- `position` (string, optional): The position of the toast on the screen. Possible values are 'top-left', 'top-right', 'bottom-left', or 'bottom-right'. Default is 'bottom-right'.
- `type` (string, optional): The type of the toast notification. This can be used to apply different styles or icons. Default is 'default'.
- `onClose` (function, optional): A callback function that is called when the toast is closed.
- `duration` (number, optional): The duration (in milliseconds) for which the toast is displayed before automatically closing. Default is 3000 (3 seconds).

### Example

Here's an example of using the Toast class to display a success notification:

```javascript
import Toast from './toast';

const toast = new Toast({
  message: 'Task completed successfully!',
  position: 'top-right',
  type: 'success',
  duration: 5000,
});

toast.open();
```

License
This project is licensed under the MIT License.

#To use

Import from and call it programatically

```tsx
import React from 'react';
import { Toast } from '@/components/blocks/toast';

const Index = () => {
  const handleToastClose = () => {
    console.log('Toast closed');
  };
  const ShowToast = () => {
    const notify = new Toast({
      message: 'Hello, world!',
      position: 'bottom-right',
      type: 'success',
      onClose: () => {
        // Handle close event
        handleToastClose();
      },
      duration: 5000,
    });

    notify.open(); //must be opened before it is rendered

    notify.close(); //can be closed
  };

  return <div></div>;
};
```
