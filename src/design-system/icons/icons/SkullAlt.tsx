import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const SkullAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M10 18V21M14 20V21M21 12V13C21 15.2091 19.2091 17 17 17V21H7V17C4.79086 17 3 15.2091 3 13V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 10.5C10 11.6046 9.10457 12.5 8 12.5C6.89543 12.5 6 11.6046 6 10.5C6 9.39543 6.89543 8.5 8 8.5C9.10457 8.5 10 9.39543 10 10.5ZM18 10.5C18 11.6046 17.1046 12.5 16 12.5C14.8954 12.5 14 11.6046 14 10.5C14 9.39543 14.8954 8.5 16 8.5C17.1046 8.5 18 9.39543 18 10.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12V13C2 15.419 3.71776 17.4367 6 17.9V21C6 21.5523 6.44772 22 7 22H9V20C9 19.4477 9.44772 19 10 19C10.5523 19 11 19.4477 11 20V22H13V21C13 20.4477 13.4477 20 14 20C14.5523 20 15 20.4477 15 21V22H17C17.5523 22 18 21.5523 18 21V17.9C20.2822 17.4367 22 15.419 22 13V12C22 6.47715 17.5228 2 12 2ZM5.5 10.5C5.5 9.11929 6.61929 8 8 8C9.38071 8 10.5 9.11929 10.5 10.5C10.5 11.8807 9.38071 13 8 13C6.61929 13 5.5 11.8807 5.5 10.5ZM16 8C14.6193 8 13.5 9.11929 13.5 10.5C13.5 11.8807 14.6193 13 16 13C17.3807 13 18.5 11.8807 18.5 10.5C18.5 9.11929 17.3807 8 16 8Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('skull-alt', SkullAlt);
