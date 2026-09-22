import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Save: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14106)">
<path d="M4.66669 14.3333H13.3334C13.5986 14.3333 13.8529 14.2279 14.0405 14.0404C14.228 13.8529 14.3334 13.5985 14.3334 13.3333V5.45663L12.5567 3.66663H12.0634V6.81329H7.06335V3.66663H4.66669C4.40147 3.66663 4.14712 3.77198 3.95958 3.95952C3.77204 4.14706 3.66669 4.40141 3.66669 4.66663V13.3333C3.66669 13.5985 3.77204 13.8529 3.95958 14.0404C4.14712 14.2279 4.40147 14.3333 4.66669 14.3333ZM5.33335 8.98329H12.7067V13.4833H5.33335V8.99996V8.98329Z" fill={color}/>
<path d="M11.0033 3.67993H9.82001V5.7266H11.0033V3.67993Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14106">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('save', Save);
