import React from 'react';
import { Link } from '@/components/labs/typography';
import { Icon } from '@/components/illustrations';
import { Tag } from '../blocks/tag';
export type MenuItem = {
  name: string;
  icon: JSX.Element | React.ReactElement | null;
  url: string;
  id: string;
  onClick?: () => void;
  tag?: string;
};
export type MenuProps = {
  menu: MenuItem[];
};

const MenuList = ({ menu }: MenuProps) => {
  return (
    <>
      <nav className="mt-4 lg:m-0">
        <ul className="space-y-4 lg:space-y-2 font-bold text-xl lg:text-xl font-inter">
          {menu.map(({ id, name, icon, url, tag, onClick }, i) => (
            <li key={id}>
              <Link
                href={url}
                className="flex items-center p-2 text-slate-900 rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={onClick}
              >
                <Icon
                  icon={icon as React.ReactElement}
                  className="w-6 h-6 mr-2"
                  strokeWidth={2.5}
                />
                <span
                  className={`flex-1 whitespace-nowrap text-ellipsis truncate`}
                >
                  {name}
                </span>
                {tag && (
                  <>
                    <Tag variant="green">{tag}</Tag>
                    
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export { MenuList };
