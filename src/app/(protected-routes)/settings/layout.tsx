import { ReactNode } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageFrame } from '@/components/frames';
import { PaneConfig } from '@/components/blocks/side-panel/types';
import { SettingsLinks } from '@/features/settings';

export default function StoriesLayout({ children }: { children: ReactNode }) {
  const sidePanelSections: PaneConfig[] = [
    {
      id: 'settings-links',
      title: 'Settings',
      showLink: false,
      component: <SettingsLinks />,
    },
  ];

  return (
    <UserLayout>
      <StoriesPageFrame sidePanelSections={sidePanelSections}>
        {children}
      </StoriesPageFrame>
    </UserLayout>
  );
}
