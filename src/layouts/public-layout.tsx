import React from 'react';
import { NavMain } from '@/components/blocks/nav';
import MainMenu from '@/components/menus/main-menu';
const PublicLayout = ({ children }: any) => {
  return (
    <div
      className={`relative container lg:grid lg:grid-cols-10 lg:max-w-7xl mx-auto`}
    >
      <NavMain>
        <MainMenu />
      </NavMain>
      <main className={`w-full lg:col-span-8`}>{children}</main>
    </div>
  );
};

export default PublicLayout;
