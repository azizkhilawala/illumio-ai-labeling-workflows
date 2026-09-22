import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DialpadCircle: React.FC<IconComponentProps> = ({
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
        <><path d="M17 5C17 3.89543 17.8954 3 19 3C20.1046 3 21 3.89543 21 5C21 6.10457 20.1046 7 19 7C17.8954 7 17 6.10457 17 5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 5C3 3.89543 3.89543 3 5 3C6.10457 3 7 3.89543 7 5C7 6.10457 6.10457 7 5 7C3.89543 7 3 6.10457 3 5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10 19C10 17.8954 10.8954 17 12 17C13.1046 17 14 17.8954 14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 5C2 3.34315 3.34315 2 5 2C6.65685 2 8 3.34315 8 5C8 6.65685 6.65685 8 5 8C3.34315 8 2 6.65685 2 5ZM9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5ZM16 5C16 3.34315 17.3431 2 19 2C20.6569 2 22 3.34315 22 5C22 6.65685 20.6569 8 19 8C17.3431 8 16 6.65685 16 5ZM2 12C2 10.3431 3.34315 9 5 9C6.65685 9 8 10.3431 8 12C8 13.6569 6.65685 15 5 15C3.34315 15 2 13.6569 2 12ZM9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12ZM16 12C16 10.3431 17.3431 9 19 9C20.6569 9 22 10.3431 22 12C22 13.6569 20.6569 15 19 15C17.3431 15 16 13.6569 16 12ZM9 19C9 17.3431 10.3431 16 12 16C13.6569 16 15 17.3431 15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('dialpad-circle', DialpadCircle);
