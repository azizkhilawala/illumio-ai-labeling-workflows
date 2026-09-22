import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ResizeHandle: React.FC<IconComponentProps> = ({
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
        <><path d="M21 15L15 21M21 8L8 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M21.7071 7.29289C22.0976 7.68342 22.0976 8.31658 21.7071 8.70711L8.70711 21.7071C8.31658 22.0976 7.68342 22.0976 7.29289 21.7071C6.90237 21.3166 6.90237 20.6834 7.29289 20.2929L20.2929 7.29289C20.6834 6.90237 21.3166 6.90237 21.7071 7.29289ZM21.7071 14.2929C22.0976 14.6834 22.0976 15.3166 21.7071 15.7071L15.7071 21.7071C15.3166 22.0976 14.6834 22.0976 14.2929 21.7071C13.9024 21.3166 13.9024 20.6834 14.2929 20.2929L20.2929 14.2929C20.6834 13.9024 21.3166 13.9024 21.7071 14.2929Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('resize-handle', ResizeHandle);
