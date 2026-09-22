import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowUpLeft: React.FC<IconComponentProps> = ({
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
        <><path d="M17 17L7 7M7 7V16M7 7H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6 7C6 6.44772 6.44772 6 7 6H16C16.5523 6 17 6.44772 17 7C17 7.55228 16.5523 8 16 8H9.41421L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L8 9.41421V16C8 16.5523 7.55228 17 7 17C6.44772 17 6 16.5523 6 16V7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-up-left', ArrowUpLeft);
