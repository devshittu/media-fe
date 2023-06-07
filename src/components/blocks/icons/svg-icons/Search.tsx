import * as React from 'react';
import { IconProps } from '../types';
const Search = (props: IconProps) => {
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
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
};
export default Search;
