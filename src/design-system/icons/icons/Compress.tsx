import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Compress: React.FC<IconComponentProps> = ({
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
        <><path d="M9 4V9H4M15 4V9H20M4 15H9V20M15 20V15H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M9 3C9.55228 3 10 3.44772 10 4V9C10 9.55228 9.55228 10 9 10H4C3.44772 10 3 9.55228 3 9C3 8.44772 3.44772 8 4 8H8V4C8 3.44772 8.44772 3 9 3ZM15 3C15.5523 3 16 3.44772 16 4V8H20C20.5523 8 21 8.44772 21 9C21 9.55228 20.5523 10 20 10H15C14.4477 10 14 9.55228 14 9V4C14 3.44772 14.4477 3 15 3ZM3 15C3 14.4477 3.44772 14 4 14H9C9.55228 14 10 14.4477 10 15V20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20V16H4C3.44772 16 3 15.5523 3 15ZM14 15C14 14.4477 14.4477 14 15 14H20C20.5523 14 21 14.4477 21 15C21 15.5523 20.5523 16 20 16H16V20C16 20.5523 15.5523 21 15 21C14.4477 21 14 20.5523 14 20V15Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('compress', Compress);
