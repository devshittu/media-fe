'use client';
// useAudio.ts
import { useState, useEffect } from 'react';
import { AudioService } from '../audioService';

export const useAudio = (src: string) => {
  const [audioService] = useState(new AudioService(src));
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (playing) {
      audioService.pause();
    } else {
      audioService.play();
    }
    setPlaying(!playing);
  };

  // Update progress as the audio plays
  useEffect(() => {
    const interval = setInterval(() => {
      const currentProgress =
        (audioService.audio.currentTime / audioService.audio.duration) * 100 ||
        0;
      setProgress(currentProgress);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [playing]);

  return { playing, togglePlayPause, progress };
};
