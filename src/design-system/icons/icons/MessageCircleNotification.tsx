import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MessageCircleNotification: React.FC<IconComponentProps> = ({
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
        <><path d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21H3.00463C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3M20.1213 3.87868C21.2929 5.05025 21.2929 6.94975 20.1213 8.12132C18.9497 9.29289 17.0503 9.29289 15.8787 8.12132C14.7071 6.94975 14.7071 5.05025 15.8787 3.87868C17.0503 2.70711 18.9497 2.70711 20.1213 3.87868Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M18 12C19.4893 12 20.8519 11.4574 21.9009 10.559C21.9688 11.0295 22.0039 11.5107 22.0039 12C22.0039 17.5228 17.5267 22 12.0039 22H3.00471C2.67039 22 2.3581 21.8329 2.17263 21.5548C1.98721 21.2767 1.95297 20.9244 2.08136 20.6158C2.15877 20.4291 2.23023 20.2397 2.30007 20.05C2.35537 19.8997 2.42003 19.7356 2.48854 19.5616C2.87068 18.5914 3.37301 17.3161 3.04425 16.4457C2.37798 15.1053 2.00391 13.595 2.00391 12C2.00391 6.47715 6.48105 2 12.0039 2C12.491 2 12.97 2.03483 13.4384 2.10212C12.5416 3.15066 12 4.51208 12 6C12 9.31371 14.6863 12 18 12Z" fill={color}/>
<path d="M18 10C20.2091 10 22 8.20914 22 6C22 3.79086 20.2091 2 18 2C15.7909 2 14 3.79086 14 6C14 8.20914 15.7909 10 18 10Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('message-circle-notification', MessageCircleNotification);
