import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LinkAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M14 12C14 14.7614 11.7614 17 9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H7.5M10 12C10 9.23858 12.2386 7 15 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17H16.5" stroke={color} strokeWidth="2" strokeLinecap="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16H9C11.2091 16 13 14.2091 13 12C13 11.4477 13.4477 11 14 11C14.5523 11 15 11.4477 15 12C15 15.3137 12.3137 18 9 18H7C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6H7.5C8.05228 6 8.5 6.44772 8.5 7C8.5 7.55228 8.05228 8 7.5 8H7ZM15 8C12.7909 8 11 9.79086 11 12C11 12.5523 10.5523 13 10 13C9.44772 13 9 12.5523 9 12C9 8.68629 11.6863 6 15 6H17C20.3137 6 23 8.68629 23 12C23 15.3137 20.3137 18 17 18H16.5C15.9477 18 15.5 17.5523 15.5 17C15.5 16.4477 15.9477 16 16.5 16H17C19.2091 16 21 14.2091 21 12C21 9.79086 19.2091 8 17 8H15Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('link-alt', LinkAlt);
