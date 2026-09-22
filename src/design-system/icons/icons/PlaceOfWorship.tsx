import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const PlaceOfWorship: React.FC<IconComponentProps> = ({
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
        <><path d="M4.5 14L3 15V21H7M7 21H10M7 21V13L9.5 11V6L12 3L14.5 6V11L17 13V21M10 21H14M10 21V17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17V21M14 21H17M17 21H21V15L19.5 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12.7682 2.35982C12.5782 2.13182 12.2968 2 12 2C11.7032 2 11.4218 2.13182 11.2318 2.35982L8.73178 5.35982C8.58202 5.53953 8.5 5.76606 8.5 6V10.5194L6.37531 12.2191C6.13809 12.4089 6 12.6962 6 13V20H4V15.5352L5.0547 14.8321C5.51423 14.5257 5.6384 13.9048 5.33205 13.4453C5.0257 12.9858 4.40483 12.8616 3.9453 13.1679L2.4453 14.1679C2.1671 14.3534 2 14.6656 2 15V21C2 21.5523 2.44772 22 3 22H10V18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18V22H21C21.5523 22 22 21.5523 22 21V15C22 14.6656 21.8329 14.3534 21.5547 14.1679L20.0547 13.1679C19.5952 12.8616 18.9743 12.9858 18.6679 13.4453C18.3616 13.9048 18.4858 14.5257 18.9453 14.8321L20 15.5352V20H18V13C18 12.6962 17.8619 12.4089 17.6247 12.2191L15.5 10.5194V6C15.5 5.76606 15.418 5.53953 15.2682 5.35982L12.7682 2.35982Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('place-of-worship', PlaceOfWorship);
