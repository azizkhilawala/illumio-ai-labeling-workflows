import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const WhatsNew: React.FC<IconComponentProps> = ({
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
        <><path d="M20.8079 6.96338L15.7129 9.3523M21 12.9791L17.4601 12.87M13.7862 5.83591L15.9237 2.99996M5.39259 21L4.8947 18.7624M3 15.2878L9.84283 6.01803L14.5215 15.2002L3 15.2878Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('WhatsNew', WhatsNew);
