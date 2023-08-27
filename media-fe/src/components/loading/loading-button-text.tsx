import React from 'react';

//Body of line body
export const LoadingButtonText = ({ width }: { width: string }) => {
  return (
    <div
      className={`inline-flex items-center px-2 mr-2 lg:mr-0 text-sm lg:text-xl font-medium text-slate-800 dark:text-slate-300 border-2 border-slate-600 dark:border-slate-400`}
    >
      <span
        className={`h-6 ${width} self-center bg-slate-200 dark:bg-slate-700 my-2`}
      ></span>
    </div>
  );
};
