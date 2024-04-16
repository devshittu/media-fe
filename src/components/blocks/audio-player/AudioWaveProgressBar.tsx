// components/AudioWaveProgressBar.tsx
import React from 'react';

type AudioWaveProgressBarProps = {
  progress: number; // Progress as a percentage (0 to 100)
};

export const AudioWaveProgressBar: React.FC<AudioWaveProgressBarProps> = ({
  progress,
}) => {
  const bars = [
    { height: 'h-6', color: 'bg-gray-600' },
    { height: 'h-9', color: 'bg-gray-600' },
    { height: 'h-full', color: 'bg-gray-600' },
    // ... Add all bars here with their respective heights and default colors
    { height: 'h-2', color: 'bg-blue-500' }, // The active bar indicating progress
  ];

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      {bars.map((bar, index) => {
        const isActive = (index / bars.length) * 100 < progress;
        return (
          <div
            key={index}
            className={`w-1 rounded ${bar.height} ${
              isActive ? bar.color : 'bg-gray-300'
            }`}
          ></div>
        );
      })}
    </div>
  );
};
