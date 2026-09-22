import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Stopped: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14193)">
<path d="M11.21 3.66663H6.78999L3.66666 6.78996V11.21L6.78999 14.3333H11.21L14.3333 11.21V6.78996L11.21 3.66663Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14193">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('stopped', Stopped);
