'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SystemSettings,
  AccountSettings,
  PersonalSettings,
  NotificationSettings,
  SecuritySettings,
} from '@/features/settings';
import { useUserSettings } from '@/features/settings/api/get-user-settings';
import { Loading } from '@/components/loading';
import { NotFound } from '@/components/not-found';
import { StoriesPageHeader } from '@/components/blocks/headers';

const sectionTitles: Record<string, string> = {
  account: 'Account',
  notifications: 'Notifications',
  personal: 'Personal',
  system: 'System',
  security: 'Security',
  default: 'Settings',
};

export default function SettingsSectionClient() {
  const searchParams = useSearchParams();
  const section = searchParams?.get('section');
  const { data: responseData, isLoading } = useUserSettings({
    params: { user_id: '1' },
  });

  const userSettings = useMemo(() => responseData || [], [responseData]);

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
}
