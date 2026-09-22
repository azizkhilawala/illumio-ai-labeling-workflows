import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockTenThirty: React.FC<IconComponentProps> = ({
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
        <><path d="M12 17V12L9.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM10.0146 9.64266C9.54107 9.35851 8.92681 9.51207 8.64266 9.98566C8.35851 10.4592 8.51207 11.0735 8.98566 11.3576L11.0002 12.5663V17.0002C11.0002 17.5524 11.4479 18.0002 12.0002 18.0002C12.5524 18.0002 13.0002 17.5524 13.0002 17.0002V12.0002C13.0002 11.6489 12.8159 11.3234 12.5146 11.1427L10.0146 9.64266Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-ten-thirty', ClockTenThirty);
