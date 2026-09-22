import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const FileBlockAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M16 20.2476L20.2374 16M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8.8 2H15L20 7V12.3414C19.3744 12.1203 18.7013 12 18 12C14.6863 12 12 14.6863 12 18C12 19.5367 12.5777 20.9385 13.5278 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2ZM14 7.2V3.5L18.5 8H14.8C14.52 8 14.38 8 14.273 7.9455C14.1789 7.89757 14.1024 7.82108 14.0545 7.727C14 7.62004 14 7.48003 14 7.2Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M22 18C22 20.2091 20.2091 22 18 22C15.7909 22 14 20.2091 14 18C14 15.7909 15.7909 14 18 14C20.2091 14 22 15.7909 22 18ZM20 18C20 19.1046 19.1046 20 18 20C17.8208 20 17.6472 19.9764 17.482 19.9323L19.9323 17.482C19.9764 17.6472 20 17.8208 20 18ZM16.0677 18.5181L18.5181 16.0677C18.3528 16.0236 18.1792 16 18 16C16.8954 16 16 16.8954 16 18C16 18.1792 16.0236 18.3528 16.0677 18.5181Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('file-block-alt-1', FileBlockAlt1);
