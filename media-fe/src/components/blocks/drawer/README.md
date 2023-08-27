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

import {Drawer, DrawerSide} from '@/components/blocks/drawer';
import React from 'react'

const Page = () => {
    const openDrawer = () => {
      const drawer = new Drawer({
        title: 'Share!',
        titleIcon: <ShareIcon />,
        id: 'story-list-item-share',
        side: DrawerSide.BOTTOM,
        children: <StoryListItemContextMenu story={story} />,// component for displaying
        type: 'success',
        onClose: () => {
          // Handle close event
          console.log('Drawer closed');
        },
      });

      drawer.open();
    };
  return (
     <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            return openDrawer();
          }}
        >
          <Icon icon={<MoreHorizontalIcon />} className="w-6" />
        </Link>)
}

export default Page


```
