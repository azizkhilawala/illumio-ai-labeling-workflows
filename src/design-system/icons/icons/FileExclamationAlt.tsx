import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const FileExclamationAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M9 17H13M9 13H13M9 9H10M17.0098 18V15M17.0098 21H16.9998M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H13M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8.8 2H15L20 7V12C18.3431 12 17 13.3431 17 15V21.9712C16.5286 22 15.9474 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2ZM14 7.2V3.5L18.5 8H14.8C14.52 8 14.38 8 14.273 7.9455C14.1789 7.89757 14.1024 7.82108 14.0545 7.727C14 7.62004 14 7.48003 14 7.2ZM8 8C7.44772 8 7 8.44772 7 9C7 9.55228 7.44772 10 8 10H9C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8H8ZM8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H13C13.5523 14 14 13.5523 14 13C14 12.4477 13.5523 12 13 12H8ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H8Z" fill={color}/>
<path d="M19 15C19 14.4477 19.4477 14 20 14C20.5523 14 21 14.4477 21 15V18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18V15Z" fill={color}/>
<path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('file-exclamation-alt', FileExclamationAlt);
