import React from 'react';
import { Icon } from '../illustrations';
import { AvatarIcon } from '../illustrations/icons/others';

export const LoadingAvatar = ({ ...props }) => {
  return (
    <Icon
      icon={<AvatarIcon />}
      className="text-slate-200 w-14 h-14 dark:text-slate-700"
      {...props}
    />
  );
};
