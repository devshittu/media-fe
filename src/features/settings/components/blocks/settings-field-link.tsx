import Checkbox from '@/components/form/checkbox';
import React from 'react';
import { SettingsFieldLinkProps, SettingsFieldProps } from '../types';
import { Link } from '@/components/labs';

export const SettingsFieldLink: React.FC<SettingsFieldLinkProps> = ({
  id,
  title,
  description,
  linkHref = '#',
}) => {
  return (
    <div className="p-8 border-b border-slate-200 dark:border-slate-700">
      <Link
        href={linkHref}
        id={id}
        className="flex items-center align-top justify-between text-slate-900 dark:text-white"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight">{title}</h5>
        <div className="flex items-center space-x-1">
          {/* {onSideFieldTypeComponent} */}
        </div>
      </Link>
      {description && (
        <p className="mb-3 font-normal text-slate-700 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
};

// Path src/features/settings/components/blocks/settings-field-link.tsx
