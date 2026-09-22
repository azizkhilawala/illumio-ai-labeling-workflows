import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const PopIn: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14112)">
<path d="M10.885 12.5566L3.715 5.29329L5.34166 3.66663L12.505 10.92L14.285 9.13329V14.33L9.095 14.3333L10.885 12.5566Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14112">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('pop-in', PopIn);
