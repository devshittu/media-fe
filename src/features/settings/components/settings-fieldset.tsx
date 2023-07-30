import React from 'react';
import SettingsStyles from './settings.module.css';
import { SettingsFieldsetProps } from './types';

export const SettingsFieldset = ({
  id,
  title,
  description,
  children,
}: SettingsFieldsetProps) => {
  const handleSubmit = (status: boolean) => {
    console.log('status', status);
  };

  return (
    <div>
      <div className="flex items-center" id={id}>
        <h2
          className={`mb-4 mx-8 text-xl md:text-3xl lg:text-4xl text-slate-950 dark:text-slate-50 font-bold tracking-tight `}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={`mb-3 mx-8 font-normal text-slate-700 dark:text-slate-400`}
        >
          {description}
        </p>
      )}
      <section
        className={`text-slate-900 dark:text-slate-100 grid grid-cols-1`}
      >
        {children}
      </section>
    </div>
  );
};
