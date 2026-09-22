import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Link: React.FC<IconComponentProps> = ({
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
        <><path d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 8.68629 4.68629 6 8 6H10C10.5523 6 11 6.44772 11 7C11 7.55228 10.5523 8 10 8H8C5.79086 8 4 9.79086 4 12C4 14.2091 5.79086 16 8 16H10C10.5523 16 11 16.4477 11 17C11 17.5523 10.5523 18 10 18H8C4.68629 18 2 15.3137 2 12ZM13 7C13 6.44772 13.4477 6 14 6H16C19.3137 6 22 8.68629 22 12C22 15.3137 19.3137 18 16 18H14C13.4477 18 13 17.5523 13 17C13 16.4477 13.4477 16 14 16H16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8H14C13.4477 8 13 7.55228 13 7ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('link', Link);
