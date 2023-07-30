import { Link } from '@/components/labs/typography';
import { Button } from '@/components/button';
import { ReactElement, Suspense, useRef, useState } from 'react';
import UserLayout from '@/layouts/user-layout';
import MainMenu from '@/components/menus/main-menu';
import { FieldError, InputField } from '@/components/form';
import { AppLogoIcon, Icon, MenuIcon } from '@/components/illustrations';
import { Drawer, DrawerSide } from '@/components/blocks/drawer';
import {
  SystemPreferences,
  AccountSettings,
  PersonalPreferences,
} from '@/features/settings/';
import { Loading } from '@/components/loading';
import { Category } from '@/features/categories';
import dynamic from 'next/dynamic'; // Import next/dynamic
import { useUserSettings } from '@/features/settings/api/get-user-settings';

// Rest of the code remains the same...
const PersonalPreferencesLazy = dynamic(
  () =>
    import('@/features/settings/components/sections/personal-preferences').then(
      (mod) => mod.PersonalPreferences,
    ),
  { loading: () => <Loading /> }, // Optional loading indicator while the component is loading
);

const Index = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<FieldError | null>(null);

  const dataFromUseSettings = useUserSettings({ params: { user_id: '1' } });
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
  const handleEmailChange = (value: string) => {
    setEmail(value);

    // Example validation
    if (value.trim() === '') {
      setEmailError({ message: 'Email is required' });
    } else {
      setEmailError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Example form submission
    if (!emailError && email.trim() !== '') {
      // Perform further actions, such as API requests or form submission
      console.log('Form submitted');
    }
  };
  if (dataFromUseSettings.isLoading) {
    return <Loading />;
  }
  return (
    <div
      className={`flex relative min-h-full w-full min-w-0 m-0 items-stretch grow flex-row p-0 justify-between shrink-0 basis-auto `}
    >
      <div
        className={`flex flex-col flex-shrink-0 basis-auto flex-grow relative p-0 min-w-0 min-h-0 m-0 border-x max-w-full lg:max-w-[640px]x box-border border-slate-100 dark:border-slate-800`}
      >
        {/* Desktop */}
        <header
          ref={headerRef}
          className={`hidden lg:block stickyx top-0x w-full backdrop-blurx flex-none  transition-all  duration-350x ease-out transform translate-x-0 translate-z-0  lg:z-20 lg:border-bx lg:border-slate-900/10x dark:border-slate-500/40x bg-slate-50/75x dark:bg-slate-900/75x`}
        >
          <div className={`transition-all duration-350 ease-out`}>
            <h1 className="mb-4x text-4xlx text-xl p-4 pl-8 font-extrabold leading-none tracking-tight text-slate-900 md:text-5xlx lg:text-6xlx dark:text-white">
              Settings
            </h1>
          </div>
        </header>
        {/* mobile */}
        <header
          className={`lg:hidden fixed left-0 top-[-1.5px] z-30
               w-full backdrop-blur flex-none transition-all duration-350 ease-out lg:z-20 lg:border-b lg:border-slate-900/10 dark:border-slate-500/40 bg-slate-50/75 dark:bg-slate-900/75 
              transform translate-x-0 translate-z-0 
             `}
        >
          <div className={`flex items-center p-4 lg:hidden `}>
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                return openMainMenuDrawer();
              }}
            >
              <Icon icon={<MenuIcon />} className="w-6" />
            </Link>
            <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
              <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
                Home
              </li>
            </ol>
          </div>
          <div>
            <ul
              className="flex justify-around -mb-px text-sm font-medium text-center"
              id="myTab"
              data-tabs-toggle="#myTabContent"
              role="tablist"
            >
              <li className="mr-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-4 rounded-t-lg border-slate-500 dark:border-slate-200  font-semibold text-slate-900 truncate dark:text-slate-200"
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  For You
                </button>
              </li>
              <li role="presentation">
                <button
                  className="inline-block p-4 border-b-4 border-transparent    hover:text-slate-600 hover:border-slate-300 dark:hover:text-slate-300"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Following
                </button>
              </li>
            </ul>
          </div>
        </header>
        <section>
          <div className={`mt-28 lg:mt-7`}>
            <div className={`flex flex-col space-y-10`}>
              <AccountSettings />
              {/* <PersonalPreferences categories={dataFromUseSettings.data.favorite_categories as Category[]} /> */}

              <Suspense fallback={<Loading />}>
                <PersonalPreferencesLazy
                  userSelectedCategoriesId={
                    dataFromUseSettings.data?.favorite_categories as string[]
                  }
                />
              </Suspense>
              <SystemPreferences />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;

//Path: src/pages/settings/index.tsx
