import React, { ReactNode } from 'react';
import NextLink from 'next/link';

const variants = {
  link: {
    variant: 'link',
    color: 'primary',
  },
  solid: {
    variant: 'solid',
    bg: 'primary',
    color: 'primaryAccent',
    _hover: {
      opacity: '0.9',
    },
  },
  outline: {
    variant: 'outline',
    bg: 'white',
  },
};

export type LinkProps = {
  href: string;
  id?: string;
  title?: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  icon?: JSX.Element;
  shallow?: boolean;
  className?: string;
  target?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const Link = ({
  href,
  id,
  children,
  variant = 'link',
  icon,
  shallow = false,
  className = '',
  onClick,
  target,
  ...props
}: LinkProps) => {
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // event.preventDefault();
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <NextLink
      shallow={shallow}
      href={href}
      className={className}
      passHref
      onClick={handleLinkClick}
      target={target}
      {...props}
    >
      {/* <Button
        icon={icon}
        as="a"
        {...variants[variant]}
      > */}
      {children}
      {/* </Button> */}
    </NextLink>
  );
};
