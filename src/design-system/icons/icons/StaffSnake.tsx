import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const StaffSnake: React.FC<IconComponentProps> = ({
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
        <><path d="M15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15H10C8.89543 15 8 14.1046 8 13C8 12.2597 8.4022 11.6134 9 11.2676M12 19H10M15 11H17C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5H8M12 3V21M8 5H6C4.89543 5 4 5.89543 4 7C4 8.10457 4.89543 9 6 9C7.10457 9 8 8.10457 8 7V6.5V5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V4H17C19.2091 4 21 5.79086 21 8C21 10.2091 19.2091 12 17 12H14V10H17C18.1046 10 19 9.10457 19 8C19 6.89543 18.1046 6 17 6H13V14H15C16.6569 14 18 15.3431 18 17C18 18.6569 16.6569 20 15 20H14V18H15C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V20H10C9.44772 20 9 19.5523 9 19C9 18.4477 9.44772 18 10 18H11V16H10C8.34315 16 7 14.6569 7 13C7 11.3431 8.34315 10 10 10V12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14H11V6H9V7C9 8.65685 7.65685 10 6 10C4.34315 10 3 8.65685 3 7C3 5.34315 4.34315 4 6 4H11V3C11 2.44772 11.4477 2 12 2ZM7 6H6C5.44772 6 5 6.44772 5 7C5 7.55228 5.44772 8 6 8C6.55228 8 7 7.55228 7 7V6Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('staff-snake', StaffSnake);
