"use client"
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useCountdown } from '../hooks/useCountdown';

// Modify the CountdownContextType
type CountdownContextType = {
    timeLeft: string;
    startCountdown: (hours?: number, minutes?: number, seconds?: number) => void;
    stopCountdown: () => void;
    resetCountdown: (hours?: number, minutes?: number, seconds?: number) => void; // Update this line
};

const CountdownContext = createContext<CountdownContextType | undefined>(undefined);

export const CountdownProvider = ({ children }: { children: ReactNode }) => {
    const [initialTime, setInitialTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [timerRunning, setTimerRunning] = useState(false);

    const handleStart = useCallback(() => {
        setTimerRunning(true);
        console.log('Countdown started');
    }, []);

    const handleEnd = useCallback(() => {
        setTimerRunning(false);
        console.log('Countdown ended');
    }, []);

    const timeLeft = useCountdown({
        hours: initialTime.hours,
        minutes: initialTime.minutes,
        seconds: initialTime.seconds,
        onStart: handleStart,
        onEnd: handleEnd,
    });

    const startCountdown = useCallback((hours = 0, minutes = 0, seconds = 0) => {
        if (!timerRunning) {
            setInitialTime({ hours, minutes, seconds });
            setTimerRunning(true);
        }
    }, [timerRunning]);

    const stopCountdown = useCallback(() => {
        setTimerRunning(false);
        console.log('Countdown stopped');
    }, []);

    const resetCountdown = useCallback((hours = 0, minutes = 0, seconds = 0) => {
        setInitialTime({ hours, minutes, seconds });
        setTimerRunning(false); // Stop the current timer
        setTimeout(() => setTimerRunning(true), 0); // Start the new timer
        console.log('Countdown reset');
    }, []);

    return (
        <CountdownContext.Provider value={{ timeLeft, startCountdown, stopCountdown, resetCountdown }}>
            {children}
        </CountdownContext.Provider>
    );
};

export const useCountdownContext = () => {
    const context = useContext(CountdownContext);
    if (!context) {
        throw new Error('useCountdownContext must be used within a CountdownProvider');
    }
    return context;
};

// src/components/countdown/contexts/countdown-context.tsx