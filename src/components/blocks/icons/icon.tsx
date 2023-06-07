import React, { CSSProperties } from 'react';

type IconProps = {
  icon: JSX.Element;
  foregroundColor?: string;
  backgroundColor?: string;
  useBackground?: boolean;
  size?: number;
  rounded?: 'full' | 'half' | 'none';
};

const Icon = ({
  icon,
  // foregroundColor = 'black',
  // backgroundColor = 'transparent',
  size = 24,
  rounded = 'none',
  useBackground = false,
}: IconProps) => {
  const iconStyle: CSSProperties = {
    width: size || 'auto',
    height: size || 'auto',
    // fill: foregroundColor,
    // background: backgroundColor,
  };
  const roundedStyle = () => {
    if (rounded === 'full') return 'rounded-full';
    else if (rounded === 'half') return 'rounded-md';
    else return 'rounded-none';
  };
  return (
    <span
      style={iconStyle}
      className={`flex justify-center items-center 
      ${roundedStyle()} 
      ${useBackground && 'bg-slate-200 dark:bg-slate-700'}
      `}
    >
      {React.cloneElement(icon, {
        // style: { width: '100%', height: '100%' },
        // style: { width: size, height: size },
        // className: 'stroke-emerald-500',
      })}
    </span>
  );
};

export default Icon;
