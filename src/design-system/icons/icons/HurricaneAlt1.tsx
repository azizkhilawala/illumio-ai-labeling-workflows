import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const HurricaneAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M11.95 11.95H11.959M11 17C7.13401 17 4 13.866 4 10C4 6.13401 7.13401 3 11 3M12 21C15.866 21 19 17.866 19 14C19 10.134 15.866 7 12 7M12.4 11.95C12.4 12.1985 12.1985 12.4 11.95 12.4C11.7015 12.4 11.5 12.1985 11.5 11.95C11.5 11.7015 11.7015 11.5 11.95 11.5C12.1985 11.5 12.4 11.7015 12.4 11.95Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M11 4C7.68629 4 5 6.68629 5 10C5 13.3137 7.68629 16 11 16C11.5523 16 12 16.4477 12 17C12 17.5523 11.5523 18 11 18C6.58172 18 3 14.4183 3 10C3 5.58172 6.58172 2 11 2C11.5523 2 12 2.44772 12 3C12 3.55228 11.5523 4 11 4ZM11 7C11 6.44772 11.4477 6 12 6C16.4183 6 20 9.58172 20 14C20 18.4183 16.4183 22 12 22C11.4477 22 11 21.5523 11 21C11 20.4477 11.4477 20 12 20C15.3137 20 18 17.3137 18 14C18 10.6863 15.3137 8 12 8C11.4477 8 11 7.55228 11 7ZM10.5 11.95C10.5 11.1492 11.1492 10.5 11.95 10.5C12.7508 10.5 13.4 11.1492 13.4 11.95C13.4 12.7508 12.7508 13.4 11.95 13.4C11.1492 13.4 10.5 12.7508 10.5 11.95Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('hurricane-alt-1', HurricaneAlt1);
