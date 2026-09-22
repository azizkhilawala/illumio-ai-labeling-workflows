import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Close: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14199)">
<path d="M14.3333 5.40996L12.59 3.66663L9 7.25663L5.41 3.66663L3.66667 5.40996L7.25667 8.99996L3.66667 12.59L5.41 14.3333L9 10.7433L12.59 14.3333L14.3333 12.59L10.7433 8.99996L14.3333 5.40996Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14199">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('close', Close);
