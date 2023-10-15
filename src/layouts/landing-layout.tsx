import { LeftColumn, LeftColumnContent } from '@/components/labs/LandingPage';
import React, { ReactNode } from 'react';

type LandingLayoutProps = {
  children: ReactNode;
};

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div
      className={`relative containerx lg:grid lg:grid-cols-12 lg:max-w-7xlx mx-auto`}
    >
      <LeftColumn>
        <LeftColumnContent />
      </LeftColumn>

      <main className={`w-full  lg:col-span-6`}>{children}</main>
    </div>
  );
};

export default LandingLayout;
