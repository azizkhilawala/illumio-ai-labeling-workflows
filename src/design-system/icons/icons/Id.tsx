import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Id: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14155)">
<path d="M10.4233 3.66663H7.6333V7.33996H10.4233V3.66663Z" fill={color}/>
<path d="M13 6H11.1467V8.21667H6.91V6H5C4.26333 6 3.66667 6.9 3.66667 7.63667V13C3.66667 13.3536 3.80714 13.6928 4.05719 13.9428C4.30724 14.1929 4.64638 14.3333 5 14.3333H13C13.3536 14.3333 13.6928 14.1929 13.9428 13.9428C14.1929 13.6928 14.3333 13.3536 14.3333 13V7.33333C14.3333 6.97971 14.1929 6.64057 13.9428 6.39052C13.6928 6.14048 13.3536 6 13 6ZM11.9433 12.8067H6.11333V11.9H11.9433V12.8067ZM11.9433 10.6233H6.11333V9.72H11.9433V10.6233Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14155">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('id', Id);
