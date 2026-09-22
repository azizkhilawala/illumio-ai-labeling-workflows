import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CompactDisc: React.FC<IconComponentProps> = ({
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
        <><path d="M6.5 12.25C6.5 9.07436 9.07436 6.5 12.25 6.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12.25 7.5C9.62665 7.5 7.5 9.62665 7.5 12.25C7.5 12.8023 7.05228 13.25 6.5 13.25C5.94772 13.25 5.5 12.8023 5.5 12.25C5.5 8.52208 8.52208 5.5 12.25 5.5C12.8023 5.5 13.25 5.94772 13.25 6.5C13.25 7.05228 12.8023 7.5 12.25 7.5ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('compact-disc', CompactDisc);
