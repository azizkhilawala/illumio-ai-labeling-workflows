import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Pin: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14114)">
<path fillRule="evenodd" clipRule="evenodd" d="M13.3771 8.3737L12.8451 7.83498L10.3468 10.6363V12.5555L9.74074 13.0404L7.90236 11.1683L3.66667 14.3333L6.9798 10.2289L5.10101 8.38043L5.57576 7.88885H7.46465L10.3131 5.24575L9.70034 4.62285L10.6465 3.66663L14.3333 7.42083L13.3771 8.3737Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14114">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('pin', Pin);
