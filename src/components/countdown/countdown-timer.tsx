'use client';
import React from 'react';
import { useCountdown } from './hooks/useCountdown';

type CountdownTimerProps = {
  hours?: number;
  minutes?: number;
  seconds?: number;
  onStart?: () => void;
  onTick?: (timeLeft: string) => void;
  onEnd?: () => void;
  className?: string;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  onStart,
  onTick,
  onEnd,
  className = '',
}) => {
  const timeLeft = useCountdown({
    hours,
    minutes,
    seconds,
    onStart,
    onTick,
    onEnd,
  });

  return (
    <span className={`text-gray-700 dark:text-gray-300 ${className}`}>
      Verification is ending in <span className="font-bold">{timeLeft}</span>
    </span>
  );
};
// src/components/countdown/countdown-timer.tsx
