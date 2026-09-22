import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Engine: React.FC<IconComponentProps> = ({
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
        <><path d="M14 8V5M11 5H17M6 12H3M3 9V15M21 11V19M9 12H9.01M12 12H12.01M15 12H15.01M6 8V16H8L10 19H18V10L16 8H6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M10 5C10 4.44772 10.4477 4 11 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H15V7H16C16.2652 7 16.5196 7.10536 16.7071 7.29289L18.7071 9.29289C18.8946 9.48043 19 9.73478 19 10V19C19 19.5523 18.5523 20 18 20H10C9.66565 20 9.35342 19.8329 9.16795 19.5547L7.46482 17H6C5.44772 17 5 16.5523 5 16V13H4V15C4 15.5523 3.55228 16 3 16C2.44772 16 2 15.5523 2 15V9C2 8.44772 2.44772 8 3 8C3.55228 8 4 8.44772 4 9V11H5V8C5 7.44772 5.44772 7 6 7H13V6H11C10.4477 6 10 5.55228 10 5ZM9 12C9.55228 12 10 11.5523 10 11C10 10.4477 9.55228 10 9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12ZM13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11ZM15 12C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10C14.4477 10 14 10.4477 14 11C14 11.5523 14.4477 12 15 12Z" fill={color}/>
<path d="M21 10C21.5523 10 22 10.4477 22 11V19C22 19.5523 21.5523 20 21 20C20.4477 20 20 19.5523 20 19V11C20 10.4477 20.4477 10 21 10Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('engine', Engine);
