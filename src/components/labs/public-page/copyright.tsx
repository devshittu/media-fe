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
    <div className="flex flex-col-reverse justify-between md:items-center py-5 border-t border-slate-300 dark:border-slate-700 lg:flex-row">
      <p className="text-sm">{text}</p>

      {themeComponent && (
        <div className="hidden md:block">{themeComponent}</div>
      )}
      <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row text-sm">
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

// export default Copyright;
