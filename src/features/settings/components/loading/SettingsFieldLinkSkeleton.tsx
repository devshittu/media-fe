import React from 'react';

export const SettingsFieldLinkSkeleton: React.FC = () => {
  return (
    <div className="p-8 border-b border-slate-200 dark:border-slate-700 animate-pulse">
      <div className="flex items-center align-top justify-between">
        {/* Title Skeleton */}
        <div className="h-6 bg-slate-200 dark:bg-slate-700 w-1/2 mb-2"></div>
        <div className="flex items-center space-x-1">
          {/* Additional content skeleton can be added here if needed */}
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="h-4 bg-slate-200 dark:bg-slate-700 w-3/4 mb-3"></div>
    </div>
  );
};

// src/features/settings/components/loading/SettingsFieldLinkSkeleton.tsx
