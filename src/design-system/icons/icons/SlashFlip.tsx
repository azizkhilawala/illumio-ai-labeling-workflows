import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const SlashFlip: React.FC<IconComponentProps> = ({
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
        <><path d="M16 21L8 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M16.4064 21.9138C16.9111 21.6895 17.1384 21.0986 16.9141 20.5939L8.91406 2.59387C8.68976 2.08918 8.0988 1.86189 7.59411 2.08619C7.08943 2.3105 6.86213 2.90146 7.08644 3.40614L15.0864 21.4061C15.3107 21.9108 15.9017 22.1381 16.4064 21.9138Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('slash-flip', SlashFlip);
