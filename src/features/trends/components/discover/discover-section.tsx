import { Button } from '@/components/button';
import { Icon } from '@/components/illustrations';
import React from 'react';

export type DiscoverSectionAction = {
  label: string;
  onClick: () => void;
  icon?: JSX.Element;
  id: string;
};
export type DiscoverSectionProps = {
  title: string;
  children?: React.ReactNode;
  actions?: DiscoverSectionAction[];
};

export const DiscoverSection = ({
  title,
  actions,
  children,
}: DiscoverSectionProps) => {
  return (
    <>
      <div className="relative p-4 md:p-6 lg:p-8">
        <div className="my-5 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-slate-100">
            {title}
          </h2>
          <div className="flex justify-between">
            {actions &&
              actions?.length > 0 &&
              actions.map((action: DiscoverSectionAction) => (
                <Button
                  key={action.id}
                  id={action.id}
                  onClick={action.onClick}
                  className=" text-2xl rounded-sm p-2 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  {action.icon && (
                    <Icon
                      icon={action.icon}
                      className="h-6 w-6"
                      strokeWidth={2.5}
                    />
                  )}
                </Button>
              ))}
          </div>
        </div>
        {children && children}
      </div>
    </>
  );
};

// Path: src/features/trends/components/discover/discover-section.tsx
