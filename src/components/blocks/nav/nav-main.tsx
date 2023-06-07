import React from 'react';

type NavMainProps = {
  children?: React.ReactNode;
};
export const NavMain = ({ children }: NavMainProps) => {
  return (
    <aside
      className={` hidden lg:flex transition-all duration-0 sticky top-0 left-0 flex-col  h-screen min-h-0 col-span-2 `}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">{children}</div>
    </aside>
  );
};
