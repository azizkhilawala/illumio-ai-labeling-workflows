import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Cauldron: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><path d="M3 10H21M9 3L9.00707 3.00707M19 10V13C19 16.866 15.866 20 12 20C8.13401 20 5 16.866 5 13V10M6 16.6076V21M18 16.6076V21M15 6C15 6.55228 14.5523 7 14 7C13.4477 7 13 6.55228 13 6C13 5.44772 13.4477 5 14 5C14.5523 5 15 5.44772 15 6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M9.7072 2.29299C9.31673 1.90241 8.68357 1.90233 8.29299 2.2928C7.90241 2.68327 7.90233 3.31643 8.2928 3.70701L8.29987 3.71408C8.69034 4.10466 9.3235 4.10475 9.71408 3.71427C10.1047 3.3238 10.1047 2.69064 9.71427 2.30006L9.7072 2.29299Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M3 9C2.44772 9 2 9.44772 2 10C2 10.5523 2.44772 11 3 11H4V13C4 14.4063 4.36284 15.7278 5 16.876V21C5 21.5522 5.44772 22 6 22C6.55228 22 7 21.5522 7 21V19.2454C8.3696 20.3433 10.1081 21 12 21C13.8919 21 15.6304 20.3433 17 19.2454V21C17 21.5522 17.4477 22 18 22C18.5523 22 19 21.5522 19 21V16.876C19.6372 15.7278 20 14.4063 20 13V11H21C21.5523 11 22 10.5523 22 10C22 9.44772 21.5523 9 21 9H3Z" fill={color}/>
<path d="M12 6C12 4.89543 12.8954 4 14 4C15.1046 4 16 4.89543 16 6C16 7.10457 15.1046 8 14 8C12.8954 8 12 7.10457 12 6Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cauldron', Cauldron);
