import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ContainerStorage: React.FC<IconComponentProps> = ({
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
        <><path d="M3 19H21M3 5H21M4 5V19M20 5V19M8 8.5V15.5M16 8.5V15.5M12 8.5V15.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 4C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6V18C2.44772 18 2 18.4477 2 19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19C22 18.4477 21.5523 18 21 18V6C21.5523 6 22 5.55228 22 5C22 4.44772 21.5523 4 21 4H3ZM8 7.5C8.55228 7.5 9 7.94772 9 8.5V15.5C9 16.0523 8.55228 16.5 8 16.5C7.44772 16.5 7 16.0523 7 15.5V8.5C7 7.94772 7.44772 7.5 8 7.5ZM12 7.5C12.5523 7.5 13 7.94772 13 8.5V15.5C13 16.0523 12.5523 16.5 12 16.5C11.4477 16.5 11 16.0523 11 15.5V8.5C11 7.94772 11.4477 7.5 12 7.5ZM17 8.5C17 7.94772 16.5523 7.5 16 7.5C15.4477 7.5 15 7.94772 15 8.5V15.5C15 16.0523 15.4477 16.5 16 16.5C16.5523 16.5 17 16.0523 17 15.5V8.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('container-storage', ContainerStorage);
