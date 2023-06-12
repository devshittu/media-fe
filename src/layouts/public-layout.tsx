import { NavMain } from '@/components/blocks/nav';
import { LeftColumn, LeftColumnContent } from '@/components/labs/LandingPage';
import MainMenu from '@/components/menus/main-menu';
import React, { ReactNode, useContext, useRef } from 'react';

type PublicLayoutProps = {
  children: ReactNode;
  leftMenu?: ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
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

export default PublicLayout;
