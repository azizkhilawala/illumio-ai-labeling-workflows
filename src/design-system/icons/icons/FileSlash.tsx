import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const FileSlash: React.FC<IconComponentProps> = ({
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
        <><path d="M3 3L21 21M5 5V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H17C18.1046 21 19 20.1046 19 19M19 9L13 3M19 9H14.6C14.0399 9 13.7599 9 13.546 8.89101C13.3578 8.79513 13.2049 8.64215 13.109 8.45399C13 8.24008 13 7.96005 13 7.4V3M19 9V14M13 3H8.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M19.3939 20.8081L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L4.01069 5.42491C4 5.81136 4 6.26273 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.7691 21.4656 19.1213 21.1691 19.3939 20.8081Z" fill={color}/>
<path d="M20 9V15.7858L6.31998 2.10576C6.88919 2 7.64667 2 8.8 2H13V5.8C13 6.9201 13 7.48016 13.218 7.90798C13.4097 8.28431 13.7157 8.59027 14.092 8.78201C14.5198 9 15.0799 9 16.2 9H20Z" fill={color}/>
<path d="M19.8204 7.00005C19.7221 6.78408 19.5852 6.58528 19.4142 6.41426L15.5858 2.58583C15.4148 2.41482 15.216 2.27797 15 2.17969V6.50005C15 6.77619 15.2239 7.00005 15.5 7.00005H19.8204Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('file-slash', FileSlash);
