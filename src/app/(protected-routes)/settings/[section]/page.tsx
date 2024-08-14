import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageFrame } from '@/components/frames';
import SettingsSectionClient from '../_component/SettingsSectionClient';

const sidePanelSections = [
  {
    id: 'settings-links',
    title: 'Settings',
    showLink: false,
    component: <SettingsSectionClient />,
  },
];

export default function SettingsPage() {
  return (
      <>
        <SettingsSectionClient />
      {/* <UserLayout>
        <StoriesPageFrame sidePanelSections={sidePanelSections}>
        </StoriesPageFrame>
      </UserLayout> */}
      </>
  );
}
