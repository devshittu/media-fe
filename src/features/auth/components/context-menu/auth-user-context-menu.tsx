import { BoxIcon } from '@/components/illustrations';
import { MenuButtonItem } from '@/components/menus/menu';
import React from 'react';
import { useSignout } from '../../api/post-signout';
import { useRouter } from 'next/router';

export const AuthUserContextMenu = () => {
  const { push } = useRouter();
  const signout = useSignout();
  const handleSignout = () => {
    signout.submit();
    //Show successfull logout message in a toast.
    push('/');
  };
  return (
    <div className="w-48 text-slate-900 bg-white border-2 border-slate-600  shadow-md dark:shadow-slate-950 dark:bg-slate-950 dark:border-slate-400 dark:text-white">
      <MenuButtonItem
        icon={<BoxIcon className="w-5 h-5 stroke-[2.5] dark:text-white" />}
        label="Profile"
        onClick={() => console.log('Profile clicked')}
      />
      <MenuButtonItem
        label="Settings"
        onClick={() => console.log('Settings clicked')}
      />
      {/* <MenuButtonItem
        label="Messages"
        onClick={() => console.log('Messages clicked')}
      /> 
      <MenuButtonItem
        disabled
        label="Download"
        onClick={() => console.log('Download clicked')}
      />*/}
      <MenuButtonItem label="Signout" onClick={handleSignout} />
    </div>
  );
};
