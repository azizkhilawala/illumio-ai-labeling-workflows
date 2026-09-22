import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const BallPile: React.FC<IconComponentProps> = ({
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
        <><path d="M11 12.0001C11 13.1046 10.1046 14.0001 9 14.0001C7.89543 14.0001 7 13.1046 7 12.0001C7 10.8955 7.89543 10.0001 9 10.0001C10.1046 10.0001 11 10.8955 11 12.0001Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17 12.0001C17 13.1046 16.1046 14.0001 15 14.0001C13.8954 14.0001 13 13.1046 13 12.0001C13 10.8955 13.8954 10.0001 15 10.0001C16.1046 10.0001 17 10.8955 17 12.0001Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14 6.81006C14 7.91463 13.1046 8.81006 12 8.81006C10.8954 8.81006 10 7.91463 10 6.81006C10 5.70549 10.8954 4.81006 12 4.81006C13.1046 4.81006 14 5.70549 14 6.81006Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8 17.1901C8 18.2946 7.10457 19.1901 6 19.1901C4.89543 19.1901 4 18.2946 4 17.1901C4 16.0855 4.89543 15.1901 6 15.1901C7.10457 15.1901 8 16.0855 8 17.1901Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14 17.1901C14 18.2946 13.1046 19.1901 12 19.1901C10.8954 19.1901 10 18.2946 10 17.1901C10 16.0855 10.8954 15.1901 12 15.1901C13.1046 15.1901 14 16.0855 14 17.1901Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20 17.1901C20 18.2946 19.1046 19.1901 18 19.1901C16.8954 19.1901 16 18.2946 16 17.1901C16 16.0855 16.8954 15.1901 18 15.1901C19.1046 15.1901 20 16.0855 20 17.1901Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M5 16C3.34315 16 2 17.3431 2 19C2 20.6569 3.34315 22 5 22C6.65685 22 8 20.6569 8 19C8 17.3431 6.65685 16 5 16Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M8.5 9C6.84315 9 5.5 10.3431 5.5 12C5.5 13.6569 6.84315 15 8.5 15C10.1569 15 11.5 13.6569 11.5 12C11.5 10.3431 10.1569 9 8.5 9Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M12.5 12C12.5 10.3431 13.8431 9 15.5 9C17.1569 9 18.5 10.3431 18.5 12C18.5 13.6569 17.1569 15 15.5 15C13.8431 15 12.5 13.6569 12.5 12Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('ball-pile', BallPile);
