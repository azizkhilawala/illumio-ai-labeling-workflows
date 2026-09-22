import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DollarSign: React.FC<IconComponentProps> = ({
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
        <><path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V4H14.6458C17.0506 4 19 5.94943 19 8.35417V8.5C19 9.05228 18.5523 9.5 18 9.5C17.4477 9.5 17 9.05228 17 8.5V8.35417C17 7.054 15.946 6 14.6458 6H13V11H14.5C16.9853 11 19 13.0147 19 15.5C19 17.9853 16.9853 20 14.5 20H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V20H9.42708C6.98207 20 5 18.0179 5 15.5729V15.5C5 14.9477 5.44772 14.5 6 14.5C6.55228 14.5 7 14.9477 7 15.5V15.5729C7 16.9134 8.08664 18 9.42708 18H11V13H9.5C7.01472 13 5 10.9853 5 8.5C5 6.01472 7.01472 4 9.5 4H11V3C11 2.44772 11.4477 2 12 2ZM11 6H9.5C8.11929 6 7 7.11929 7 8.5C7 9.88071 8.11929 11 9.5 11H11V6ZM13 13V18H14.5C15.8807 18 17 16.8807 17 15.5C17 14.1193 15.8807 13 14.5 13H13Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('dollar-sign', DollarSign);
