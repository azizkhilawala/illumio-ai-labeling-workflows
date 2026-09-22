import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Hourglass: React.FC<IconComponentProps> = ({
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
        <><path d="M20 3H4M20 21H4M5 3C5 5.51022 6.21228 7.86592 8.25493 9.32495L15.7451 14.675C17.7877 16.1341 19 18.4898 19 21M19 3C19 5.51022 17.7877 7.86592 15.7451 9.32495L8.25493 14.675C6.21228 16.1341 5 18.4898 5 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3C21 3.55228 20.5523 4 20 4H19.9429C19.662 6.45003 18.3581 8.68738 16.3263 10.1387L13.7205 12L16.3263 13.8613C18.3581 15.3126 19.662 17.55 19.9429 20H20C20.5523 20 21 20.4477 21 21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21C3 20.4477 3.44772 20 4 20H4.0571C4.33798 17.55 5.64187 15.3126 7.6737 13.8613L10.2795 12L7.6737 10.1387C5.64187 8.68738 4.33798 6.45003 4.0571 4H4C3.44772 4 3 3.55228 3 3ZM6.07415 4C6.34303 5.80181 7.33081 7.43596 8.83617 8.51122L12 10.7711L15.1638 8.51122C16.6692 7.43596 17.657 5.80181 17.9258 4H6.07415ZM12 13.2289L8.83617 15.4888C7.33081 16.564 6.34303 18.1982 6.07415 20H17.9258C17.657 18.1982 16.6692 16.564 15.1638 15.4888L12 13.2289Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('hourglass', Hourglass);
