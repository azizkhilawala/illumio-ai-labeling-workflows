import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Stop: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14100)">
<path d="M14.3333 3.66663H3.66667V14.3333H14.3333V3.66663Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14100">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('stop', Stop);
