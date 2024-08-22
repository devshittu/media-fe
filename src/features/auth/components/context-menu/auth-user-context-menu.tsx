'use client';
import { BoxIcon } from '@/components/illustrations';
import { MenuButtonItem } from '@/components/menus/menu';
import { useSignout } from '@/features/auth/hooks/useSignout';

export const AuthUserContextMenu = () => {

  const { signout } = useSignout();
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
      <MenuButtonItem label="Signout" onClick={signout} />
    </div>
  );
};

// src/features/auth/components/context-menu/auth-user-context-menu.tsx