import { Button } from '@/components/button';
import React from 'react';
// import { useTab } from './store';

export type Tab = {
  id: string;
  label: string;
  // You can add more properties as needed
};

type TabListProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  scrollable?: boolean;
};

export const TabList: React.FC<TabListProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  scrollable = false,
}) => {
  return (
    <ul
      className={`flex ${
        !scrollable ? 'justify-around' : 'justify-start'
      } -mb-px text-sm font-medium text-center overflow-hidden overflow-x-scroll`}
      role="tablist"
      data-tabs-toggle="#myTabContent"
    >
      {tabs.map((tab) => (
        <li key={tab.id} className="mr-2 last:mr-0" role="tab">
          <Button
            className={`inline-block p-4 border-b-4 rounded-t-lg ${
              activeTab === tab.id
                ? 'font-black border-slate-500 dark:border-slate-200 text-slate-900 dark:text-slate-200'
                : 'border-transparent hover:text-slate-600 hover:border-slate-300 dark:hover:text-slate-300'
            }`}
            onClick={() => setActiveTab(tab.id)}
            id={tab.id}
            aria-controls={tab.id}
            aria-selected={activeTab === tab.id}
          >
            <span className=" whitespace-nowrap">{tab.label}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};

// src/components/blocks/tab/tab-list.tsx
