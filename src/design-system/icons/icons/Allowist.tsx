import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Allowist: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14225)">
<path d="M3.66667 3.66663V14.3333H14.3333V3.66663H3.66667ZM13.17 13.1566H4.83667V4.84996H13.17V13.1566Z" fill={color}/>
<path d="M7.33333 6H6V7.33333H7.33333V6Z" fill={color}/>
<path d="M7.33333 8.33325H6V9.66658H7.33333V8.33325Z" fill={color}/>
<path d="M7.33333 10.6666H6V12H7.33333V10.6666Z" fill={color}/>
<path d="M9.66667 6H8.33334V7.33333H9.66667V6Z" fill={color}/>
<path d="M9.66667 8.33325H8.33334V9.66658H9.66667V8.33325Z" fill={color}/>
<path d="M9.66667 10.6666H8.33334V12H9.66667V10.6666Z" fill={color}/>
<path d="M12 6H10.6667V7.33333H12V6Z" fill={color}/>
<path d="M12 8.33325H10.6667V9.66658H12V8.33325Z" fill={color}/>
<path d="M12 10.6666H10.6667V12H12V10.6666Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14225">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('allowist', Allowist);
