import {
  AppLogoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Icon,
  MenuIcon,
} from '@/components/illustrations';
import React from 'react';
import { Link } from '@/components/labs'; // Import your Button component
import { Button } from '@/components/button';
import { useRouter } from 'next/router';

interface HeaderProps {
  menuLinks: { href: string; label: string }[];
}

export const Header: React.FC<HeaderProps> = ({ menuLinks }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goForward = () => {
    router.push('/forward-page'); // Replace '/forward-page' with the actual URL of the forward page
  };

  return (
    <header className="p-1">
      <div className="container flex justify-between h-16 mx-auto">
        <div className="flex flex-row gap-4">
          <Link
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2 text-slate-900 dark:text-slate-100"
            onClick={goBack}
          >
            <ChevronLeftIcon className="w-8 stroke-2" />
          </Link>
          <Link
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2 text-slate-900 dark:text-slate-100"
          >
            <AppLogoIcon className="w-8 stroke-2" />
          </Link>
        </div>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          {menuLinks.map((link) => (
            <li className="flex" key={link.href}>
              <Link
                href={link.href}
                className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-cyan-400 dark:border-cyan-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <Button className="self-center px-8 py-3 rounded">Sign in</Button>
          <Button className="self-center px-8 py-3 font-semibold rounded dark:bg-cyan-400 dark:text-gray-900">
            Sign up
          </Button>

          <Link
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2 text-slate-900 dark:text-slate-100"
            onClick={goBack}
          >
            <ChevronRightIcon className="w-8 stroke-2" />
          </Link>
        </div>
        <Button className="p-4 lg:hidden">
          <Icon icon={<MenuIcon />} className="w-6 h-6 dark:text-gray-100" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
