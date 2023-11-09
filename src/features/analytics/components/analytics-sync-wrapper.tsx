import React from 'react';
import { useAnalyticsSync } from '../hooks';

// Create a new component that calls useAnalyticsSync

export const AnalyticsSyncWrapper = () => {
  useAnalyticsSync({ interval: 30000 });
  return null; // This component doesn't need to render anything
};
