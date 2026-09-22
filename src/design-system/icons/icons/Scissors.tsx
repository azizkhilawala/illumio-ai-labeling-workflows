import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Scissors: React.FC<IconComponentProps> = ({
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
        <><path d="M8.15179 15.85L21 4M12.3249 12L8.15 8.15M21 20L15 14.4669M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6ZM9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15C7.65685 15 9 16.3431 9 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6 4C4.89543 4 4 4.89543 4 6C4 7.10457 4.89543 8 6 8C7.10457 8 8 7.10457 8 6C8 4.89543 7.10457 4 6 4ZM2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6C10 6.72918 9.80489 7.41279 9.46402 8.00147L12.3255 10.6402L20.322 3.26491C20.728 2.89048 21.3607 2.91605 21.7351 3.32203C22.1095 3.728 22.084 4.36065 21.678 4.73509L9.46462 15.9996C9.80511 16.588 10 17.2712 10 18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18C2 15.7909 3.79086 14 6 14C6.7545 14 7.46021 14.2089 8.06245 14.572L10.8505 12.0006L8.06142 9.42861C7.45941 9.79134 6.75407 10 6 10C3.79086 10 2 8.20914 2 6ZM14.2649 13.789C14.6393 13.383 15.2719 13.3574 15.6779 13.7318L21.6779 19.2649C22.0839 19.6393 22.1095 20.2719 21.7351 20.6779C21.3607 21.0839 20.7281 21.1095 20.3221 20.7351L14.3221 15.2021C13.9161 14.8277 13.8905 14.195 14.2649 13.789ZM6 16C4.89543 16 4 16.8954 4 18C4 19.1046 4.89543 20 6 20C7.10457 20 8 19.1046 8 18C8 16.8954 7.10457 16 6 16Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('scissors', Scissors);
