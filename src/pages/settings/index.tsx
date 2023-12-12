import { ReactElement, useRef } from 'react';
import UserLayout from '@/layouts/user-layout';
import MainMenu from '@/components/menus/main-menu';
import { AppLogoIcon, Icon, MenuIcon } from '@/components/illustrations';
import { Drawer, DrawerSide } from '@/components/blocks/drawer';
import { Loading } from '@/components/loading';
import { useUserSettings } from '@/features/settings/api/get-user-settings';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoriesPageFrame } from '@/components/frames';
import { SettingsFieldLink } from '@/features/settings/components/blocks/settings-field-link';

const SettingsPage = () => {
  const headerRef = useRef<HTMLElement>(null);
  const { data: userSettings, isLoading } = useUserSettings({
    params: { user_id: '1' },
  });
  const openMainMenuDrawer = () => {
    const drawer = new Drawer({
      title: 'Media Inc.',
      showAppLogo: true,
      titleIcon: <AppLogoIcon />,
      id: 'story-list-item-share',
      side: DrawerSide.LEFT,
      children: <MainMenu />,
      onClose: () => {
        // Handle close event
        console.log('Drawer closed');
      },
    });

    drawer.open();
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px]x box-border border-slate-100 dark:border-slate-800`}
      >
        <StoriesPageHeader pageTitle="Settings" />
        <section>
          <div className={`mt-28 lg:mt-7`}>
            <div className={`flex flex-col space-y-10x`}>
              <SettingsFieldLink
                id={'account-settings-link'}
                title="Account Settings"
                linkHref={`/settings/account`}
                description={` Personal details and contact information associated with the user's account.`}
              />
              <SettingsFieldLink
                id={'notification-settings-link'}
                title="Notification Settings"
                linkHref={`/settings/notification`}
                description={`Choose which types of notifications you'd like to receive and how.`}
              />
              <SettingsFieldLink
                id={'personal-settings-link'}
                title="Personal Settings"
                linkHref={`/settings/personal`}
                description={`Customize your experience based on your interests.`}
              />
              <SettingsFieldLink
                id={'system-settings-link'}
                title="System Settings"
                linkHref={`/settings/system`}
                description={`Settings related to the system's appearance and language.`}
              />
              <SettingsFieldLink
                id={'security-settings-link'}
                title="Security Settings"
                linkHref={`/settings/security`}
                description={`Settings related to the system's appearance and language.`}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageFrame>{page}</StoriesPageFrame>
    </UserLayout>
  );
};

export default SettingsPage;

//Path: src/pages/settings/index.tsx
