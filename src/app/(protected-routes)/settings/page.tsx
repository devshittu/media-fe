import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageFrame } from '@/components/frames';
import { SettingsContent } from './_component/SettingsContent';

export default function SettingsPage() {
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto`}
    >
      <SettingsContent />
    </div>
  );
}

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageFrame>{page}</StoriesPageFrame>
    </UserLayout>
  );
};
