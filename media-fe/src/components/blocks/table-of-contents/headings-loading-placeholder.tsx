import React from 'react';

export const HeadingsLoadingPlaceholder = () => {
  return (
    <div className="animate-pulse flex p-4 md:p-8 lg:p-8 flex-col w-full">
      <div className="h-2.5 bg-slate-200  dark:bg-slate-700 w-48 mb-4"></div>
      <div className="h-2 bg-slate-200  dark:bg-slate-700 mb-2.5"></div>
      <div className="h-2 bg-slate-200  dark:bg-slate-700 mb-2.5"></div>
      <div className="h-2 bg-slate-200  dark:bg-slate-700"></div>
    </div>
  );
};
