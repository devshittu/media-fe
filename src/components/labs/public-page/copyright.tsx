import React from 'react';
import { Link } from '@/components/labs';

interface CopyrightProps {
  text: string;
  links: { href: string; label: string }[];
}

const Copyright: React.FC<CopyrightProps> = ({ text, links }) => {
  return (
    <div className="flex flex-col-reverse justify-between py-5 border-t border-slate-300 dark:border-slate-700 lg:flex-row">
      <p className="text-sm">{text}</p>
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

export default Copyright;
