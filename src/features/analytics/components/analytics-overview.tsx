import React from 'react';
import { useAnalytics } from '@/stores/analytics/analytics';
import { ObjectTreeView } from '@/components/markdown';

const AnalyticsOverview = () => {
  const { getAllData } = useAnalytics();
  const allData = getAllData();

  return (
    <div>
      <h1>Analytics Overview</h1>
      <ObjectTreeView data={allData} />
      {/* <pre>{JSON.stringify(allData, null, 2)}</pre>  */}
    </div>
  );
};

export default AnalyticsOverview;

// Path: src/features/analytics/components/analytics-overview.tsx
