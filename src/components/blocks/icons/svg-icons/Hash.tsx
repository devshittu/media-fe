import * as React from 'react';
import { IconProps } from '../types';
const Hash = (props: IconProps) => {
  const iconStyle = {
    fill: props.color || 'none',
    width: props.size || 24,
    height: props.size || 24,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconStyle.width}
      height={iconStyle.height}
      fill={iconStyle.fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={iconStyle}
      {...props}
    >
      <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
    </svg>
  );
};
export default Hash;
