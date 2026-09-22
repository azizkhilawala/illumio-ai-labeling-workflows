import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const GripDotsVertical: React.FC<IconComponentProps> = ({
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
        <><path d="M9 6H9.01M15 6H15.01M15 12H15.01M9 12H9.01M9 18H9.01M15 18H15.01M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6ZM16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6ZM10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12ZM16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12ZM10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18ZM16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M7 6C7 4.89543 7.89543 4 9 4C10.1046 4 11 4.89543 11 6C11 7.10457 10.1046 8 9 8C7.89543 8 7 7.10457 7 6Z" fill={color}/>
<path d="M13 6C13 4.89543 13.8954 4 15 4C16.1046 4 17 4.89543 17 6C17 7.10457 16.1046 8 15 8C13.8954 8 13 7.10457 13 6Z" fill={color}/>
<path d="M7 12C7 10.8954 7.89543 10 9 10C10.1046 10 11 10.8954 11 12C11 13.1046 10.1046 14 9 14C7.89543 14 7 13.1046 7 12Z" fill={color}/>
<path d="M13 12C13 10.8954 13.8954 10 15 10C16.1046 10 17 10.8954 17 12C17 13.1046 16.1046 14 15 14C13.8954 14 13 13.1046 13 12Z" fill={color}/>
<path d="M9 16C7.89543 16 7 16.8954 7 18C7 19.1046 7.89543 20 9 20C10.1046 20 11 19.1046 11 18C11 16.8954 10.1046 16 9 16Z" fill={color}/>
<path d="M15 16C13.8954 16 13 16.8954 13 18C13 19.1046 13.8954 20 15 20C16.1046 20 17 19.1046 17 18C17 16.8954 16.1046 16 15 16Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('grip-dots-vertical', GripDotsVertical);
