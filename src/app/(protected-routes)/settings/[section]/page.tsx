import { ReactNode } from 'react';
import { StoriesPageHeader } from '@/components/blocks/headers';
import SettingsSectionRenderer from '../_component/SettingsSectionRenderer';

export default function SettingsSectionPage({
  params,
}: {
  params: { section: string };
}) {
  const section = params.section;


  return (
    <>
      <StoriesPageHeader pageTitle={section} />
      <SettingsSectionRenderer section={section} />
    </>
  );
}

// Path: src/app/settings/[section]/page.tsx