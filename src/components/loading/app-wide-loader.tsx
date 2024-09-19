"use client";

import { useState, useEffect } from 'react';
import { useLoaderStore } from '@/stores/ui/hooks/useLoaderStore';

type AppWideLoaderProps = {
  height?: string;
  color?: string;
};

const AppWideLoader = ({ height = "h-1", color = "bg-blue-500" }: AppWideLoaderProps) => {
  const isLoading = useLoaderStore((state) => state.isLoading); // Zustand state for loading
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoading) {
      // Start progress when loading starts
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? prev : prev + 1));
      }, 50);
    } else if (!isLoading && progress < 100) {
      // Complete progress when loading stops
      setProgress(100);
      setTimeout(() => setProgress(0), 300); // Small delay to show full progress
    }

    return () => {
      if (timer) clearInterval(timer);
    };
    // @ts-ignore: Unreachable code error
  }, [isLoading]);

  return isLoading || progress > 0 ? (
    <div
      className={`fixed top-0 left-0 z-50 transition-all duration-300 ease-out ${color} ${height}`}
      style={{ width: `${progress}%` }}
    />
  ) : null;
};

export default AppWideLoader;

// Path: src/components/loading/app-wide-loader.tsx