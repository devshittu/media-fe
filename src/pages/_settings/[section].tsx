import { useRouter } from 'next/router';
import {
  SystemSettings,
  AccountSettings,
  PersonalSettings,
  NotificationSettings,
  SettingsLinks,
  SecuritySettings,
} from '@/features/settings/';
import { useUserSettings } from '@/features/settings/api/get-user-settings';
import { Loading } from '@/components/loading';
import UserLayout from '@/layouts/user-layout';
import React, { ReactElement, useMemo } from 'react';
import { StoriesPageFrame } from '@/components/frames';
import { PaneConfig } from '@/components/blocks/side-panel/types';
import { NotFound } from '@/components/not-found';
import { StoriesPageHeader } from '@/components/blocks/headers'; // Ensure you've imported this

const sectionTitles: Record<string, string> = {
  account: 'Account',
  notifications: 'Notifications',
  personal: 'Personal',
  system: 'System',
  security: 'Security',
  default: 'Settings',
};

export const SettingsSection = () => {
  const router = useRouter();
  const { section } = router.query;
  const { data: responseData, isLoading } = useUserSettings({
    params: { user_id: '1' },
  });

  const userSettings = useMemo(() => responseData || [], [responseData]);

  console.log(`settingsdebug: userSettings:  ${JSON.stringify(userSettings)}`);

  const pageTitle = sectionTitles[section as string] || sectionTitles.default;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <StoriesPageHeader pageTitle={pageTitle} />

      {(() => {
        switch (section) {
          case 'account':
            return <AccountSettings initialSettingValues={userSettings} />;
          case 'notifications':
            return <NotificationSettings initialSettingValues={userSettings} />;
          case 'personal':
            return <PersonalSettings initialSettingValues={userSettings} />;
          case 'system':
            return <SystemSettings initialSettingValues={userSettings} />;
          case 'security':
            return <SecuritySettings initialSettingValues={userSettings} />;
          default:
            return <NotFound />;
        }
      })()}
    </div>
  );
};

const sidePanelSections: PaneConfig[] = [
  {
    id: 'settings-links',
    title: 'Settings',
    showLink: false,
    component: <SettingsLinks />,
  },
];

SettingsSection.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageFrame sidePanelSections={sidePanelSections}>
        {page}
      </StoriesPageFrame>
    </UserLayout>
  );
};

export default SettingsSection;

//Path: src/pages/settings/[section].tsx
