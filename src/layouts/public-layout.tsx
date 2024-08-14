import React, { ReactNode } from 'react';

type PublicLayoutProps = {
  children: ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className={`relative containerx lg:grid lg:grid-cols-12 mx-auto`}>
      <div className={`w-full  lg:col-span-12`}>{children}</div>
    </div>
  );
};

export default PublicLayout;
