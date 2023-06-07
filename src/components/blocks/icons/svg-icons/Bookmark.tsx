import * as React from 'react';
import { IconProps } from '../types';
const Bookmark = (props: IconProps) => {
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
      <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
};
export default Bookmark;
