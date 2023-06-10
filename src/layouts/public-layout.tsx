import React, { ReactNode, useContext, useRef } from 'react';

type PublicLayoutProps = {
  children: ReactNode;
  leftMenu?: ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div
      className={`relative containerx lg:grid lg:grid-cols-10 lg:max-w-7xlx mx-auto`}
    >
      <main className={`w-full  lg:col-span-12`}>{children}</main>
    </div>
  );
};

export default PublicLayout;
