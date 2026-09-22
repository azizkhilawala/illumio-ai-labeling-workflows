import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const IpLists: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14243)">
<path d="M6.63332 6.71667H5.66666V7.61667H6.63332V6.71667Z" fill={color}/>
<path d="M8.53332 6.71667H7.56665V7.61667H8.53332V6.71667Z" fill={color}/>
<path d="M10.4333 6.71667H9.46661V7.61667H10.4333V6.71667Z" fill={color}/>
<path d="M12.3334 6.71667H11.3667V7.61667H12.3334V6.71667Z" fill={color}/>
<path d="M6.63332 8.55005H5.66666V9.45005H6.63332V8.55005Z" fill={color}/>
<path d="M8.53332 8.55005H7.56665V9.45005H8.53332V8.55005Z" fill={color}/>
<path d="M10.4333 8.55005H9.46661V9.45005H10.4333V8.55005Z" fill={color}/>
<path d="M12.3334 8.55005H11.3667V9.45005H12.3334V8.55005Z" fill={color}/>
<path d="M6.63332 10.3833H5.66666V11.2833H6.63332V10.3833Z" fill={color}/>
<path d="M8.53332 10.3833H7.56665V11.2833H8.53332V10.3833Z" fill={color}/>
<path d="M10.4333 10.3833H9.46661V11.2833H10.4333V10.3833Z" fill={color}/>
<path d="M12.3334 10.3833H11.3667V11.2833H12.3334V10.3833Z" fill={color}/>
<path d="M14.3333 3.66663V14.3333H3.66666V3.66663H14.3333ZM13.5 4.49996H4.49999V13.5H13.5V4.49996Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14243">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('ip-lists', IpLists);
