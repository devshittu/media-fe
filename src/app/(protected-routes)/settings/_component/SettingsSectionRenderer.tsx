'use client';

import React, { useMemo } from 'react';
import { AccountSettings } from '@/features/settings/components/sections/account-settings';
import { NotificationSettings } from '@/features/settings/components/sections/notification-settings';
import { PersonalSettings } from '@/features/settings/components/sections/personal-settings';
import { SystemSettings } from '@/features/settings/components/sections/system-settings';
import { SecuritySettings } from '@/features/settings/components/sections/security-settings';
import { NotFound } from '@/components/not-found';
import { useUserSettings } from '@/features/settings/api/get-user-settings';

type SettingsSectionRendererProps = {
  section: string;
  // settings: any; // Replace with appropriate type
};

const sectionComponents: Record<string, React.ComponentType<any>> = {
  account: AccountSettings,
  notifications: NotificationSettings,
  personal: PersonalSettings,
  system: SystemSettings,
  security: SecuritySettings,
};

export default function SettingsSectionRenderer({
  section,
  // settings,
}: SettingsSectionRendererProps) {
  const SectionComponent = useMemo(() => {
    return sectionComponents[section] || NotFound;
  }, [section]);
  const { data: responseData, isLoading } = useUserSettings({
    params: {  },
  });

  if (isLoading) {
    return <p>Loading...</p>; // Loading state handled server-side
  }

  if (!responseData) {
    return <NotFound />;
  }
  return <SectionComponent initialSettingValues={responseData} />;
}

// src/app/(protected-routes)/settings/_component/SettingsSectionRenderer.tsx