import React from 'react';
import { TextProps } from '../shared';

const LinedBackgroundText = ({ children }: TextProps) => {
  return (
    <p className="my-8 text-center relative before:bg-slate-300/100 dark:before:bg-slate-700/100 before:bottom-0 before:content-[''] before:h-[1px] before:left-0 before:absolute before:right-0 before:w-full before:top-[50%]">
      <span className="relative px-4 bg-white dark:bg-slate-900">
        {children}
      </span>
    </p>
  );
};

export default LinedBackgroundText;
