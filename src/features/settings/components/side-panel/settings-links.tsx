import React from 'react';
import Menu, { MenuItem } from '@/components/menus/menu';
import { Tag } from '@/components/blocks/tag';
import {
  Icon,
  UserIcon,
  BellIcon,
  BoxIcon,
  MonitorIcon,
} from '@/components/illustrations/';

export const SettingsLinks = () => {
  return (
    <Menu>
      {/* <MenuHeader>
            <h3 className="text-lg font-bold">Share</h3>
          </MenuHeader> */}
      <MenuItem
        label={'Account Settings'}
        url="/settings/account"
        icon={
          <Icon
            icon={<UserIcon />}
            className="w-6 text-slate-900 dark:text-slate-100"
            strokeWidth={2.5}
          />
        }
        tag={<Tag variant="green">New</Tag>}
      />
      <MenuItem
        label={'Notification Settings'}
        url="/settings/notifications"
        icon={
          <Icon
            icon={<BellIcon />}
            className="w-6 text-slate-900 dark:text-slate-100"
            strokeWidth={2.5}
          />
        }
      />
      <MenuItem
        label={'Personal Settings'}
        url="/settings/personal"
        icon={
          <Icon
            icon={<BoxIcon />}
            className="w-6 text-slate-900 dark:text-slate-100"
            strokeWidth={2.5}
          />
        }
      />
      <MenuItem
        label={'System Settings'}
        url="/settings/system"
        icon={
          <Icon
            icon={<MonitorIcon />}
            className="w-6 text-slate-900 dark:text-slate-100"
            strokeWidth={2.5}
          />
        }
      />
    </Menu>
  );
};