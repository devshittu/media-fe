import React, {
  createContext,
  ReactNode,
  forwardRef,
  ForwardedRef,
  HTMLAttributes,
  useContext,
} from 'react';

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
      <div
        className="menu bg-white divide-y divide-slate-100 shadow w-44 md:w-48 dark:bg-slate-800 dark:divide-slate-600"
        ref={ref}
        {...rest}
      >
        <ul
          className="space-y-2 py-2 text-lg text-slate-700 dark:text-slate-200"
          aria-labelledby="menu-icons-dropdown-button"
        >
          <MenuContext.Provider value={contextValue}>
            {children}
          </MenuContext.Provider>
        </ul>
      </div>
    );
  },
);
Menu.displayName = 'Menu';

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
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  icon?: ReactNode;
  tag?: ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  onClick,
  url,
  disabled = false,
  icon,
  tag,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick(event); // Pass the event parameter when calling onClick
    }
  };

  return (
    <li>
      <Link
        href={url}
        className={`flex items-center px-4 py-2 hover:text-cyan-600 dark:hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-900 group ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={handleClick}
      >
        {icon && (
          <span className="mr-2 text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-500">
            {icon}
          </span>
        )}
        <h4>{label}</h4>
        {tag && <span className="ml-auto">{tag}</span>}
      </Link>
    </li>
  );
};

type MenuHeaderProps = {
  children: ReactNode;
};

const MenuHeader: React.FC<MenuHeaderProps> = ({ children }) => {
  return (
    <div className="menu-header border-b dark:border-slate-600 px-4 py-2">
      {children}
    </div>
  );
};

type MenuFooterProps = {
  children: ReactNode;
};

const MenuFooter: React.FC<MenuFooterProps> = ({ children }) => {
  return <div className="menu-footer">{children}</div>;
};

export { Menu, MenuItem, MenuHeader, MenuFooter };
export default Menu;
