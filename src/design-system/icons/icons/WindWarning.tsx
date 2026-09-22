import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const WindWarning: React.FC<IconComponentProps> = ({
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
        <><path d="M11.0005 16C10.1647 16.6279 9.12582 17 8 17C5.23858 17 3 14.7614 3 12C3 9.23858 5.23858 7 8 7C10.0503 7 11.8124 8.2341 12.584 10M8 10V11M8 14H8.01M16 10H18.5C19.8807 10 21 8.88071 21 7.5C21 6.11929 19.8807 5 18.5 5H17M11 13H18C19.6569 13 21 14.3431 21 16C21 17.6569 19.6569 19 18 19H16" stroke={color} strokeWidth="2" strokeLinecap="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M17 4C16.4477 4 16 4.44772 16 5C16 5.55228 16.4477 6 17 6H18.5C19.3284 6 20 6.67157 20 7.5C20 8.32843 19.3284 9 18.5 9H16C15.4477 9 15 9.44772 15 10C15 10.5523 15.4477 11 16 11H18.5C20.433 11 22 9.433 22 7.5C22 5.567 20.433 4 18.5 4H17Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M12.5078 15.9598C11.4082 17.2106 9.79631 18 8 18C4.68629 18 2 15.3137 2 12C2 8.68629 4.68629 6 8 6C10.2465 6 12.2047 7.23466 13.2329 9.06243C13.0842 9.34208 13 9.6612 13 10C11.3431 10 10 11.3431 10 13C10 14.4892 11.0851 15.725 12.5078 15.9598ZM9 9C9 8.44771 8.55229 8 8 8C7.44772 8 7 8.44771 7 9V12C7 12.5523 7.44772 13 8 13C8.55229 13 9 12.5523 9 12V9ZM8 16C8.55229 16 9 15.5523 9 15C9 14.4477 8.55229 14 8 14C7.44772 14 7 14.4477 7 15C7 15.5523 7.44772 16 8 16Z" fill={color}/>
<path d="M12 13C12 12.4477 12.4477 12 13 12H18C20.2091 12 22 13.7909 22 16C22 18.2091 20.2091 20 18 20H16C15.4477 20 15 19.5523 15 19C15 18.4477 15.4477 18 16 18H18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14H13C12.4477 14 12 13.5523 12 13Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('wind-warning', WindWarning);
