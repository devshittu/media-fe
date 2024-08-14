'use client';
// components/AudioWaveform.tsx
import React, { useEffect, useState } from 'react';

type AudioWaveformProps = {
  src: string; // URL of the audio file
};

export const AudioWaveform: React.FC<AudioWaveformProps> = ({ src }) => {
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [progress, setProgress] = useState(0); // Progress in percentage

  useEffect(() => {
    // Fetch waveform data from the server
    fetch('/api/waveform?src=' + encodeURIComponent(src))
      .then((response) => response.json())
      .then((data) => setWaveformData(data));
  }, [src]);

  const handleWaveformClick = (event: React.MouseEvent<SVGElement>) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const clickedPosition = event.clientX - boundingRect.left; // Click position within the waveform
    const totalWidth = boundingRect.width;
    const newProgress = (clickedPosition / totalWidth) * 100;
    setProgress(newProgress);
    // Here, also seek the audio to the corresponding time
  };

  return (
    <svg
      onClick={handleWaveformClick}
      className="w-full h-16 cursor-pointer"
      viewBox="0 0 1000 100"
    >
      {waveformData.map((amplitude, index) => {
        const height = amplitude; // Scale if necessary
        return (
          <rect
            key={index}
            x={index}
            y={(100 - height) / 2}
            width="1"
            height={height}
            fill="currentColor"
          />
        );
      })}
      {/* Overlay for progress */}
      <rect x="0" y="0" width={progress * 10} height="100" fill="#1C64F2" />
    </svg>
  );
};
