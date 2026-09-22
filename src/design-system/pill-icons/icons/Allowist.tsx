import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Allowist: React.FC<PillIconComponentProps> = ({
  size = 18,
  bgColor = 'var(--lightning-bluegray-600)',
  iconColor = 'var(--lightning-contrast-white)',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-pill-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="9" cy="9" r="9" fill={bgColor} />
      {/* Icon content */}
      <g >
<path d="M3.66667 3.66663V14.3333H14.3333V3.66663H3.66667ZM13.17 13.1566H4.83667V4.84996H13.17V13.1566Z" fill={iconColor}/>
<path d="M7.33333 6H6V7.33333H7.33333V6Z" fill={iconColor}/>
<path d="M7.33333 8.33325H6V9.66658H7.33333V8.33325Z" fill={iconColor}/>
<path d="M7.33333 10.6666H6V12H7.33333V10.6666Z" fill={iconColor}/>
<path d="M9.66667 6H8.33334V7.33333H9.66667V6Z" fill={iconColor}/>
<path d="M9.66667 8.33325H8.33334V9.66658H9.66667V8.33325Z" fill={iconColor}/>
<path d="M9.66667 10.6666H8.33334V12H9.66667V10.6666Z" fill={iconColor}/>
<path d="M12 6H10.6667V7.33333H12V6Z" fill={iconColor}/>
<path d="M12 8.33325H10.6667V9.66658H12V8.33325Z" fill={iconColor}/>
<path d="M12 10.6666H10.6667V12H12V10.6666Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('allowist', Allowist);
