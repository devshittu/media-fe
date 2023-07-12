import React, { createContext, ReactNode, forwardRef, ForwardedRef, HTMLAttributes, useContext } from 'react';

import { Link } from '@/components/labs/typography';

type MenuProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

type MenuContextType = {
  items: ReactNode[];
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const Menu: React.FC<MenuProps> = forwardRef(
  ({ children, ...rest }, ref: ForwardedRef<HTMLDivElement>) => {
    const items = React.Children.toArray(children);

    const contextValue: MenuContextType = {
      items,
    };

    return (
      <div className="menu p-4 pb-0 text-gray-900 md:pb-4 dark:text-white" ref={ref} {...rest}>
        <ul className="space-y-4" aria-labelledby="mega-menu-icons-dropdown-button">
          <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
        </ul>
      </div>
    );
  }
);

const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be wrapped by the Menu component.');
  }
  return context;
};

type MenuItemProps = {
  label: string;
  url: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  tag?: ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, url, disabled = false, icon, tag }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <li>

          <Link
            href="https://twitter.com/intent/tweet"
            className="flex items-center p-3 text-base font-bold text-slate-900 bg-slate-50 hover:bg-slate-100 group hover:shadow dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white"
            data-action="share/twitter/share"
            target="_blank"
          >
      {/* <a
        href="#"
        className={`flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={handleClick}
      > */}
        {icon && (
          <span className="w-3 h-3 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            {icon}
          </span>
        )}
        <span>{label}</span>
        {tag && <span className="ml-auto">{tag}</span>}
      {/* </a> */}
      </Link>
    </li>
  );
};

type MenuHeaderProps = {
  children: ReactNode;
};

const MenuHeader: React.FC<MenuHeaderProps> = ({ children }) => {
  return <div className="menu-header">{children}</div>;
};

type MenuFooterProps = {
  children: ReactNode;
};

const MenuFooter: React.FC<MenuFooterProps> = ({ children }) => {
  return <div className="menu-footer">{children}</div>;
};

export { Menu, MenuItem, MenuHeader, MenuFooter };
export default Menu;
