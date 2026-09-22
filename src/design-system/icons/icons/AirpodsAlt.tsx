import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const AirpodsAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M6 6V7M18 6V7M18.375 10.2727C20.308 10.2727 21 8.47865 21 6.52941C21 4.58017 19.433 3 17.5 3C15.567 3 14 4.58017 14 6.52941V21H17.5V11.0727C17.5 10.7927 17.5 10.6527 17.5545 10.5457C17.6024 10.4517 17.6789 10.3752 17.773 10.3272C17.88 10.2727 18.02 10.2727 18.3001 10.2727H18.375ZM5.625 10.2727C3.692 10.2727 3 8.47865 3 6.52941C3 4.58017 4.567 3 6.5 3C8.433 3 10 4.58017 10 6.52941V21H6.5V11.0727C6.5 10.7927 6.5 10.6527 6.4455 10.5457C6.39757 10.4517 6.32108 10.3752 6.227 10.3272C6.12004 10.2727 5.97998 10.2727 5.69987 10.2727H5.625Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 6.52941C2 4.03579 4.00685 2 6.5 2C8.99315 2 11 4.03579 11 6.52941V21C11 21.5523 10.5523 22 10 22H7.5C6.94772 22 6.5 21.5523 6.5 21V11.2708C5.22036 11.2314 3.5 11 2.72976 9.64591C2.18518 8.73678 2 7.59624 2 6.52941ZM5 5C5.55228 5 6 5.44772 6 6V7C6 7.55228 5.55228 8 5 8C4.44772 8 4 7.55228 4 7V6C4 5.44772 4.44772 5 5 5Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M22 6.52941C22 4.03579 19.9932 2 17.5 2C15.0068 2 13 4.03579 13 6.52941V21C13 21.5523 13.4477 22 14 22H16.5C17.0523 22 17.5 21.5523 17.5 21V11.2708C18.7796 11.2314 20.5 11 21.2702 9.64591C21.8148 8.73678 22 7.59624 22 6.52941ZM19 5C18.4477 5 18 5.44772 18 6V7C18 7.55228 18.4477 8 19 8C19.5523 8 20 7.55228 20 7V6C20 5.44772 19.5523 5 19 5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('airpods-alt', AirpodsAlt);
