import React, { HTMLAttributes } from 'react';

type TagProps = {
  variant: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

const getClassName = (variant: string): string => {
  const baseClassName = 'text-xs font-medium px-2.5 py-0.5 rounded-full';
  const darkClassName = 'dark';

  const variants: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
  };

  const variantClassName = variants[variant];

  if (!variantClassName) {
    throw new Error(`Invalid variant: ${variant}`);
  }

  return `${baseClassName} ${variantClassName} ${darkClassName}`;
};

const Tag: React.FC<TagProps> = ({ variant, children, ...rest }) => {
  const className = getClassName(variant);

  return (
    <span className={className} {...rest}>
      {children}
    </span>
  );
};

export default Tag;
