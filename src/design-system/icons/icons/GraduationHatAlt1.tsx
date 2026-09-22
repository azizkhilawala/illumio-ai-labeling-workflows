import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const GraduationHatAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M22 9L12 4L2 9L6.73684 11.3684M22 9L17.2632 11.3684M22 9V17M22 9H12M6.73684 11.3684L6.12815 16.8466C6.05115 17.5396 6.4143 18.2072 7.03794 18.519C10.1616 20.0809 13.8384 20.0809 16.9621 18.519C17.5857 18.2072 17.9488 17.5396 17.8718 16.8466L17.2632 11.3684M6.73684 11.3684L12 14L17.2632 11.3684" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11.5528 3.10557C11.8343 2.96481 12.1657 2.96481 12.4472 3.10557L22.4279 8.09589C22.2981 8.0344 22.1531 8 22 8H12C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10H22C22.5523 10 23 9.55228 23 9V17C23 17.5523 22.5523 18 22 18C21.4477 18 21 17.5523 21 17V10.618L12.4472 14.8944C12.1657 15.0352 11.8343 15.0352 11.5528 14.8944L1.55279 9.89443C1.214 9.72504 1 9.37877 1 9C1 8.62123 1.214 8.27496 1.55279 8.10557L11.5528 3.10557Z" fill={color}/>
<path d="M10.6584 16.6832L5.43063 14.0694L5.13429 16.7364C5.01103 17.8458 5.59238 18.9144 6.59074 19.4136C9.99595 21.1162 14.0041 21.1162 17.4093 19.4136C18.4077 18.9144 18.989 17.8458 18.8658 16.7364L18.5694 14.0693L13.3416 16.6832C12.4971 17.1055 11.5029 17.1055 10.6584 16.6832Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('graduation-hat-alt-1', GraduationHatAlt1);
