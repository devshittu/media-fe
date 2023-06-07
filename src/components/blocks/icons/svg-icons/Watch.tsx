import * as React from 'react';
import { IconProps } from '../types';
const Watch = (props: IconProps) => {
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
      <circle cx={12} cy={12} r={7} />
      <path d="M12 9v3l1.5 1.5M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
    </svg>
  );
};
export default Watch;
