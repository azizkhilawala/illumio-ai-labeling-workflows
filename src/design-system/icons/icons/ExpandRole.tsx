import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ExpandRole: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14168)">
<path d="M7.3 8.32833L4.71334 5.75834L3.67001 6.80167L3.66667 3.66833H6.79001L5.74667 4.725L8.33001 7.29833L7.3 8.32833Z" fill={color}/>
<path d="M10.7 8.32833L13.2867 5.75834L14.33 6.80167L14.3333 3.66833H11.21L12.2533 4.725L9.67001 7.29833L10.7 8.32833Z" fill={color}/>
<path d="M7.3 9.66833L4.71334 12.2383L3.67001 11.195L3.66667 14.3283L6.79001 14.3317L5.74667 13.2717L8.33001 10.6983L7.3 9.66833Z" fill={color}/>
<path d="M10.7 9.66833L13.2867 12.2383L14.33 11.195L14.3333 14.3283L11.21 14.3317L12.2533 13.2717L9.67001 10.6983L10.7 9.66833Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14168">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('expand-role', ExpandRole);
