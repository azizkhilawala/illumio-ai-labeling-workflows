import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DisabledStatus: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14189)">
<path d="M7.54181 13.0371C8.31034 13.3203 9.14392 13.3775 9.94392 13.2018C10.7439 13.0261 11.4769 12.625 12.056 12.0458C12.6352 11.4667 13.0363 10.7337 13.212 9.93372C13.3877 9.13372 13.3305 8.30015 13.0473 7.53162L7.54181 13.0371Z" fill={color}/>
<path d="M10.4598 4.95786C9.69127 4.67463 8.8577 4.61746 8.0577 4.79313C7.2577 4.96879 6.52476 5.36994 5.94559 5.9491C5.36643 6.52827 4.96529 7.26121 4.78962 8.06121C4.61395 8.86121 4.67112 9.69478 4.95435 10.4633L10.4598 4.95786Z" fill={color}/>
<path d="M13.1289 3.66662L3.66666 13.1289L4.87104 14.3333L14.3333 4.871L13.1289 3.66662Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14189">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('disabled-status', DisabledStatus);
