import React from 'react';
import { LoadingHeading } from './loading-heading';

//Body of line body
export const LoadingParagraph = () => {
  return (
    <div className="mb-4">
      <LoadingHeading />

      <div className="h-2 bg-slate-200  dark:bg-slate-700 mb-2.5"></div>
      <div className="h-2 bg-slate-200  dark:bg-slate-700 mb-2.5"></div>
      <div className="h-2 bg-slate-200  dark:bg-slate-700 mb-2.5"></div>
      <div className="flex items-center w-full space-x-4 max-w-[360px]">
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
        <div className="h-2.5 bg-slate-200 dark:bg-slate-700 w-80"></div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
      </div>
    </div>
  );
};

//Body of words texts

export const LoadingText = () => {
  return (
    <div
      role="status"
      className="space-y-2.5 md:space-y-4 animate-pulse max-w-lg"
    >
      <div className="flex items-center w-full space-x-2">
        <div className="h-2.5 bg-slate-200 dark:bg-slate-700 w-32"></div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-24"></div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[480px]">
        <div className="h-2.5 bg-slate-200 dark:bg-slate-700 w-full"></div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-24"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[400px]">
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
        <div className="h-2.5 bg-slate-200 dark:bg-slate-700 w-80"></div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[480px]">
        <div className="h-2.5 bg-slate-200 dark:bg-slate-700 w-full"></div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-24"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[440px]">
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-32"></div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-24"></div>
        <div className="h-2.5 bg-slate-200 dark:bg-slate-700 w-full"></div>
      </div>
      <div className="flex items-center w-full space-x-2 max-w-[360px]">
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
        <div className="h-2.5 bg-slate-200 dark:bg-slate-700 w-80"></div>
        <div className="h-2.5 bg-slate-300 dark:bg-slate-600 w-full"></div>
      </div>
    </div>
  );
};
