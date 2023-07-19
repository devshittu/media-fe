import { AppLogoIcon, Icon } from '@/components/illustrations';
import React from 'react';
import { Link } from '@/components/labs';
import { Button } from '@/components/button';
import { APP_NAME, COPYRIGHT_TEXT } from '@/config/constants';
import {Copyright} from './copyright';
import ThemeSwitch from '@/components/theme-switch/theme-switch';

type Category = {
  name: string;
  links: {
    label: string;
    url: string;
  }[];
};

type FooterProps = {
  categories: Category[];
};

export const Footer: React.FC<FooterProps> = ({ categories }) => {
  const copyrightText = COPYRIGHT_TEXT;
  const links = [
    { href: '/faq', label: 'F.A.Q' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ];
  return (
    <footer className="bg-slate-50 dark:bg-gray-950">
      <div className="p-4 py-6 mx-auto max-w-screen-xl md:p-8 lg:p-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => (
            <div key={index}>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {category.name}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400">
                {category.links.map((link, index) => (
                  <li key={index} className="mb-4">
                    <Link href={link.url} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Copyright
          text={copyrightText}
          links={links}
          themeComponent={<ThemeSwitch className="!m-0" />}
        />
      </div>
    </footer>
  );
};

export default Footer;
