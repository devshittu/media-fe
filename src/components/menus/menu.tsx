import React, {
  createContext,
  ReactNode,
  forwardRef,
  ForwardedRef,
  HTMLAttributes,
  useContext,
} from 'react';
import { Button } from '@/components/button';
import { Link } from '@/components/labs/typography';
import { Icon } from '../illustrations';

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
        className="menu divide-y divide-slate-100 shadow dark:divide-slate-600"
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

type MenuLinkItemProps = {
  label: string;
  url: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  icon?: ReactNode;
  tag?: ReactNode;
};

const MenuLinkItem: React.FC<MenuLinkItemProps> = ({
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

type MenuButtonItemProps = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tag?: ReactNode;
};

export const MenuButtonItem = ({
  label,
  icon,
  onClick,
  disabled,
  tag,
}: MenuButtonItemProps) => {
  return (
    <>
      <Button
        nativeType="button"
        className={`relative inline-flex items-center w-full px-4 py-2 text-base xl:text-lg font-medium hover:bg-slate-100 hover:text-cyan-600 focus:z-10 focus:ring-2 focus:ring-cyan-600 focus:text-cyan-600 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-slate-500 dark:focus:text-cyan-500 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {/* {icon && <Icon icon={icon} className="w-3 h-3 mr-2.5" />} */}

        {icon && (
          <span className="mr-2 text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-500">
            {icon}
          </span>
        )}

        <h4>{label}</h4>

        {tag && <span className="ml-auto">{tag}</span>}
      </Button>
    </>
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

export { Menu, MenuLinkItem, MenuHeader, MenuFooter };
export default Menu;

// Path: src/components/menus/menu.tsx