// components/ProgressBar.tsx
import React from 'react';

type ProgressBarProps = {
  progress: number; // Progress as a percentage (0 to 100)
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative w-full h-4 rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 bottom-0 bg-gray-300 dark:bg-gray-700" />
      <div
        className="absolute top-0 left-0 bottom-0 bg-blue-600 dark:bg-blue-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
