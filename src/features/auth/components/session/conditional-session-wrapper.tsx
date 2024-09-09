'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type ConditionalSessionWrapperProps = {
  children: ReactNode;
  requiresSession?: boolean; // Pass this prop to decide if session is required
};

export const ConditionalSessionWrapper = ({
  children,
  requiresSession = false,
}: ConditionalSessionWrapperProps) => {
  if (requiresSession) {
    return <SessionProvider>{children}</SessionProvider>;
  }
  return <>{children}</>; // Return children without wrapping if session isn't needed
};

// src/features/auth/components/session/conditional-session-wrapper.tsx
