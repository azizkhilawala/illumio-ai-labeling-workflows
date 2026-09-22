import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const PresentationChartArrow: React.FC<IconComponentProps> = ({
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
        <><path d="M5 3V16H19V3M3 16H21M11.5 20C11.2239 20 11 20.2239 11 20.5C11 20.7761 11.2239 21 11.5 21C11.7761 21 12 20.7761 12 20.5C12 20.2239 11.7761 20 11.5 20ZM11.5 20V16M8 11V8L12 11L16 7M16 7H13M16 7V10M11.5 20.5H11.51M3 3H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H4V15H3C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H10.5V19.3819C10.1931 19.6566 10 20.0557 10 20.5C10 21.3284 10.6716 22 11.5 22C12.3284 22 13 21.3284 13 20.5C13 20.0557 12.8069 19.6566 12.5 19.3819V17H21C21.5523 17 22 16.5523 22 16C22 15.4477 21.5523 15 21 15H20V4H21C21.5523 4 22 3.55228 22 3C22 2.44772 21.5523 2 21 2H3ZM12 7C12 7.55228 12.4477 8 13 8H13.5858L11.9062 9.67962L8.6 7.2C8.29698 6.97274 7.89157 6.93618 7.55279 7.10557C7.214 7.27496 7 7.62123 7 8V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V10L11.4 11.8C11.7981 12.0986 12.3552 12.059 12.7071 11.7071L15 9.41421V10C15 10.5523 15.4477 11 16 11C16.5523 11 17 10.5523 17 10V7C17 6.44772 16.5523 6 16 6H13C12.4477 6 12 6.44772 12 7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('presentation-chart-arrow', PresentationChartArrow);
