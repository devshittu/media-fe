import React from 'react';

type LeftColumnProps = {
  children?: React.ReactNode;
};
const LeftColumn = ({ children }: LeftColumnProps) => {
  return (
    <aside
      className={` hidden lg:flex transition-all duration-0 sticky top-0 left-0 flex-col  h-screen min-h-0 col-span-6 `}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">{children}</div>
    </aside>
  );
};
export default LeftColumn;
