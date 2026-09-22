import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const HourglassHalf: React.FC<IconComponentProps> = ({
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
        <><path d="M15 18H9M14 6H10M20 3H19M19 3H5M19 3C19 5.51022 17.7877 7.86592 15.7451 9.32495L12 12M5 3H4M5 3C5 5.51022 6.21228 7.86592 8.25493 9.32495L12 12M20 21H19M19 21H5M19 21C19 18.4898 17.7877 16.1341 15.7451 14.675L12 12M5 21H4M5 21C5 18.4898 6.21228 16.1341 8.25493 14.675L12 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3C21 3.55228 20.5523 4 20 4H19.9429C19.662 6.45003 18.3581 8.68738 16.3263 10.1387L13.7205 12L16.3263 13.8613C18.3581 15.3126 19.662 17.55 19.9429 20H20C20.5523 20 21 20.4477 21 21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21C3 20.4477 3.44772 20 4 20H4.0571C4.33798 17.55 5.64187 15.3126 7.6737 13.8613L10.2795 12L7.6737 10.1387C5.64187 8.68738 4.33798 6.45003 4.0571 4H4C3.44772 4 3 3.55228 3 3ZM6.07415 4C6.17854 4.69957 6.39131 5.37387 6.70067 6H17.2993C17.6087 5.37387 17.8215 4.69957 17.9258 4H6.07415ZM12 13.2289L8.83617 15.4888C8.24171 15.9134 7.72796 16.4252 7.30732 17H16.6927C16.272 16.4252 15.7583 15.9134 15.1638 15.4888L12 13.2289Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('hourglass-half', HourglassHalf);
