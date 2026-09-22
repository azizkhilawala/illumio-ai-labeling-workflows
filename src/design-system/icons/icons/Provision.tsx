import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Provision: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14218)">
<path d="M12.8533 10.3333V12.8533H5.14999V10.3333H3.66666V14.3333H14.3333V10.3333H12.8533Z" fill={color}/>
<path d="M10.1099 6.76663V11.1333H7.90328V6.76663H5.87994L8.99661 3.66663L12.1233 6.76663H10.1099Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14218">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('provision', Provision);
