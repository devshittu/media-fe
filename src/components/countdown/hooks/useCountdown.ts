// src/hooks/useCountdown.ts
'use client';
import { useState, useEffect, useCallback } from 'react';

type CountdownOptions = {
  hours?: number;
  minutes?: number;
  seconds?: number;
  onStart?: () => void;
  onTick?: (timeLeft: string) => void;
  onEnd?: () => void;
};

const formatTime = (time: number): string => {
  return time < 10 ? `0${time}` : `${time}`;
};

export const useCountdown = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  onStart,
  onTick,
  onEnd,
}: CountdownOptions) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [totalSeconds, setTotalSeconds] = useState<number>(
    hours * 3600 + minutes * 60 + seconds,
  );

  useEffect(() => {
    setTotalSeconds(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]); // This line ensures the countdown resets when new values are passed

  useEffect(() => {
    if (totalSeconds > 0) {
      if (onStart) onStart();

      const intervalId = setInterval(() => {
        setTotalSeconds((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(intervalId);
            if (onEnd) onEnd();
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [totalSeconds, onStart, onEnd]);

  useEffect(() => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${formatTime(hours)}:${formatTime(
      minutes,
    )}:${formatTime(seconds)}`;
    setTimeLeft(formattedTime);

    if (onTick) onTick(formattedTime);
  }, [totalSeconds, onTick]);

  return timeLeft;
};

// src/components/countdown/hooks/useCountdown.ts
