import { ReactNode } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageFrame } from '@/components/frames';

export default function StoriesLayout({ children }: { children: ReactNode }) {
  return (
    <UserLayout>
      <StoriesPageFrame>{children}</StoriesPageFrame>
    </UserLayout>
  );
}
