import React from 'react';
import { PhotoIcon } from '../illustrations/icons/others';
import { Icon } from '../illustrations';

export const LoadingPhoto = () => {
  return (
    <div className="flex items-center justify-center h-48 mb-4 bg-slate-300 rounded dark:bg-slate-700">
      <Icon
        icon={<PhotoIcon />}
        className="w-12 h-12 text-slate-200 dark:text-slate-600"
      />
    </div>
  );
};
