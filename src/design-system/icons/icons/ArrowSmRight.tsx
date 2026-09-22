import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowSmRight: React.FC<IconComponentProps> = ({
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
        <><path d="M6 12H18M18 12L13 7M18 12L13 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289L18.7071 11.2929C19.0976 11.6834 19.0976 12.3166 18.7071 12.7071L13.7071 17.7071C13.3166 18.0976 12.6834 18.0976 12.2929 17.7071C11.9024 17.3166 11.9024 16.6834 12.2929 16.2929L15.5858 13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H15.5858L12.2929 7.70711C11.9024 7.31658 11.9024 6.68342 12.2929 6.29289Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-sm-right', ArrowSmRight);
