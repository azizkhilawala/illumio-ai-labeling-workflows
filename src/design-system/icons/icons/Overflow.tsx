import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Overflow: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><circle cx="9" cy="9" r="9" fill={color}/>
<path d="M9.2 6.02119C10.0895 6.02119 10.8106 5.30011 10.8106 4.41062C10.8106 3.52113 10.0895 2.80005 9.2 2.80005C8.31051 2.80005 7.58943 3.52113 7.58943 4.41062C7.58943 5.30011 8.31051 6.02119 9.2 6.02119Z" fill={color}/>
<path d="M9.2 10.7523C10.0895 10.7523 10.8106 10.0312 10.8106 9.1417C10.8106 8.2522 10.0895 7.53113 9.2 7.53113C8.31051 7.53113 7.58943 8.2522 7.58943 9.1417C7.58943 10.0312 8.31051 10.7523 9.2 10.7523Z" fill={color}/>
<path d="M9.2 15.6C10.0895 15.6 10.8106 14.879 10.8106 13.9895C10.8106 13.1 10.0895 12.3789 9.2 12.3789C8.31051 12.3789 7.58943 13.1 7.58943 13.9895C7.58943 14.879 8.31051 15.6 9.2 15.6Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('overflow', Overflow);
