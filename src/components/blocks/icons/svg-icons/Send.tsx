import * as React from 'react';
import { IconProps } from '../types';
const Send = (props: IconProps) => {
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
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
};
export default Send;
