# How to use

Update your \_app.js as follow

```js

import { NavProvider } from '@/components/blocks/nav/providers/nav-provider';
import { BodyStyleUpdater } from '@/components/blocks/nav/body-class-updater';
    ...
    <NavProvider>
        <BodyStyleUpdater />
        {children}
    </NavProvider>
    ...
```

In your Component where you need your navigation drawer paste the following

```js
import { NavDrawerLeft } from '@/components/blocks/nav';

    ...
    <div className={`flex items-center p-4 lg:hidden `}>
    <NavDrawerLeft />
    </div>
    ...
```
