import React from 'react';

type LeftColumnProps = {
  children?: React.ReactNode;
};
export const LeftColumn = ({ children }: LeftColumnProps) => {
  return (
    <aside
      className={`bg-slate-50 dark:bg-slate-950 hidden lg:flex transition-all duration-0 sticky top-0 left-0 flex-col  h-screen min-h-0 col-span-6 `}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">{children}</div>
    </aside>
  );
};
