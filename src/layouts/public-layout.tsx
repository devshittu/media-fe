import { NavMain } from '@/components/blocks/nav';
import { LeftColumn, LeftColumnContent } from '@/components/labs/LandingPage';
import MainMenu from '@/components/menus/main-menu';
import React, { ReactNode, useContext, useRef } from 'react';

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
