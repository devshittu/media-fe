import React from 'react';
import { Link } from '@/components/labs';

type CopyrightProps = {
  text: string;
  links: { href: string; label: string }[];
  themeComponent?: JSX.Element;
};

export const Copyright: React.FC<CopyrightProps> = ({
  text,
  links,
  themeComponent,
}) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between md:items-center py-2 md:py-5 border-t border-slate-100 dark:border-slate-800">
      <p className="text-sm">{text}</p>

      {themeComponent && (
        <div className="hidden md:block">{themeComponent}</div>
      )}
      <ul className="flex flex-row space-x-2 justify-around sm:space-y-0 sm:space-x-5 sm:flex-row mb-3 lg:mb-0 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
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
