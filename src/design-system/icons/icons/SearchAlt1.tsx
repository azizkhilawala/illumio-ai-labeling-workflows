import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const SearchAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8469 17.3741 13.5477 16.3229 14.9017L21.7076 20.2933C22.0978 20.6841 22.0974 21.3173 21.7067 21.7076C21.3159 22.0978 20.6827 22.0974 20.2924 21.7067L14.9096 16.3168C13.5542 17.3717 11.8505 18 10 18C5.58172 18 2 14.4183 2 10Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('search-alt-1', SearchAlt1);
