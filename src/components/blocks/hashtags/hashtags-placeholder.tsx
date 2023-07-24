import React from 'react';

export const HashtagsPlaceholder = () => {
  return (
    <div className="animate-pulse flex gap-4 flex-wrap">
      <HashtagPlaceholderItem width="w-14" />
      <HashtagPlaceholderItem width="w-24" />
      <HashtagPlaceholderItem width="w-36" />
      <HashtagPlaceholderItem width="w-20" />
      <HashtagPlaceholderItem width="w-20" />
      <HashtagPlaceholderItem width="w-32" />
    </div>
  );
};
const HashtagPlaceholderItem = ({ width }: { width: string }) => {
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
