import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const FileBookmarkAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V10M16 14H21V21L18.5 19.611L16 21V14Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8.8 2H15L20 7V13H16C15.4477 13 15 13.4477 15 14V22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2ZM14 7.2V3.5L18.5 8H14.8C14.52 8 14.38 8 14.273 7.9455C14.1789 7.89757 14.1024 7.82108 14.0545 7.727C14 7.62004 14 7.48003 14 7.2Z" fill={color}/>
<path d="M17.5 15C17.2239 15 17 15.2239 17 15.5V21.5C17 21.6798 17.0966 21.8458 17.2529 21.9347C17.4092 22.0235 17.6012 22.0216 17.7558 21.9296L19.5 20.8913L21.2442 21.9296C21.3988 22.0216 21.5908 22.0235 21.7471 21.9347C21.9034 21.8458 22 21.6798 22 21.5V15.5C22 15.2239 21.7761 15 21.5 15H17.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('file-bookmark-alt-1', FileBookmarkAlt1);
