import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Decrease: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14241)">
<path d="M10.8872 12.5594L3.71167 5.2938L5.34218 3.66663L12.5078 10.9222L14.2883 9.13167V14.33L9.09669 14.3333L10.8872 12.5594Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14241">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('decrease', Decrease);
