import React from 'react';
import { Link } from '@/components/labs';
import { COPYRIGHT_TEXT } from '@/config/constants';

type CopyrightProps = {
  text?: string;
  links?: { url: string; label: string }[];
  themeComponent?: JSX.Element;
};

export const Copyright = ({ text, links, themeComponent }: CopyrightProps) => {
  const copyrightText = text ? text : COPYRIGHT_TEXT;
  const copyrightLinks = links
    ? links
    : [
        { url: '/faq', label: 'F.A.Q' },
        { url: '/legal/v1.0.0/privacy', label: 'Privacy Policy' },
        { url: '/legal/v1.0.0/terms', label: 'Terms & Conditions' },
      ];
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between md:items-center py-2 md:py-5 border-t border-slate-100 dark:border-slate-800">
      <p className="text-sm">{copyrightText}</p>

      {themeComponent && (
        <div className="hidden md:block">{themeComponent}</div>
      )}
      <ul className="flex flex-row space-x-2 justify-around sm:space-y-0 sm:space-x-5 sm:flex-row mb-3 lg:mb-0 text-sm">
        {copyrightLinks.map((link) => (
          <li key={link.url}>
            <Link
              href={link.url}
              className="transition-colors duration-300 hover:text-cyan-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

//Path: src/components/labs/public-page/copyright.tsx
