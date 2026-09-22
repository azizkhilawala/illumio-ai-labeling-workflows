import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const IpLists: React.FC<PillIconComponentProps> = ({
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
<path d="M6.63332 6.71667H5.66666V7.61667H6.63332V6.71667Z" fill={iconColor}/>
<path d="M8.53332 6.71667H7.56665V7.61667H8.53332V6.71667Z" fill={iconColor}/>
<path d="M10.4333 6.71667H9.46661V7.61667H10.4333V6.71667Z" fill={iconColor}/>
<path d="M12.3334 6.71667H11.3667V7.61667H12.3334V6.71667Z" fill={iconColor}/>
<path d="M6.63332 8.55005H5.66666V9.45005H6.63332V8.55005Z" fill={iconColor}/>
<path d="M8.53332 8.55005H7.56665V9.45005H8.53332V8.55005Z" fill={iconColor}/>
<path d="M10.4333 8.55005H9.46661V9.45005H10.4333V8.55005Z" fill={iconColor}/>
<path d="M12.3334 8.55005H11.3667V9.45005H12.3334V8.55005Z" fill={iconColor}/>
<path d="M6.63332 10.3833H5.66666V11.2833H6.63332V10.3833Z" fill={iconColor}/>
<path d="M8.53332 10.3833H7.56665V11.2833H8.53332V10.3833Z" fill={iconColor}/>
<path d="M10.4333 10.3833H9.46661V11.2833H10.4333V10.3833Z" fill={iconColor}/>
<path d="M12.3334 10.3833H11.3667V11.2833H12.3334V10.3833Z" fill={iconColor}/>
<path d="M14.3333 3.66663V14.3333H3.66666V3.66663H14.3333ZM13.5 4.49996H4.49999V13.5H13.5V4.49996Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('ip-lists', IpLists);
