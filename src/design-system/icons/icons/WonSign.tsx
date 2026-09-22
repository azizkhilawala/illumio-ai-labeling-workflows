import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const WonSign: React.FC<IconComponentProps> = ({
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
        <><path d="M6 12L8 19L10 12M6 12L4 5M6 12H3M6 12H10M14 12L16 19L18 12M14 12L12 5L10 12M14 12H10M14 12H18M18 12L20 5M18 12H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3.72528 4.03849C4.25631 3.88677 4.8098 4.19426 4.96152 4.72529L6.7543 11H9.2457L11.0385 4.72529C11.1611 4.29599 11.5535 4.00001 12 4.00001C12.4465 4.00001 12.8389 4.29599 12.9615 4.72529L14.7543 11H17.2457L19.0385 4.72529C19.1902 4.19426 19.7437 3.88677 20.2747 4.03849C20.8058 4.19021 21.1132 4.7437 20.9615 5.27473L19.3257 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H18.7543L16.9615 19.2747C16.8389 19.704 16.4465 20 16 20C15.5535 20 15.1611 19.704 15.0385 19.2747L13.2457 13H10.7543L8.96152 19.2747C8.83887 19.704 8.44648 20 8 20C7.55352 20 7.16113 19.704 7.03848 19.2747L5.2457 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H4.67427L3.03848 5.27473C2.88675 4.7437 3.19424 4.19021 3.72528 4.03849ZM7.32573 13L8 15.36L8.67427 13H7.32573ZM11.3257 11H12.6743L12 8.64007L11.3257 11ZM15.3257 13L16 15.36L16.6743 13H15.3257Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('won-sign', WonSign);
