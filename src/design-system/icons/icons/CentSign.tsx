import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CentSign: React.FC<IconComponentProps> = ({
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
        <><path d="M18 7.36981C16.7435 5.91657 14.9052 5 12.8571 5C9.07005 5 6 8.13401 6 12C6 15.866 9.07005 19 12.8571 19C14.9052 19 16.7435 18.0834 18 16.6302M13 5V3M13 21V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M13 2C13.5523 2 14 2.44772 14 3V4.08407C15.8889 4.36448 17.5575 5.32905 18.7565 6.71577C19.1177 7.13355 19.0718 7.76505 18.654 8.12627C18.2363 8.48748 17.6048 8.44163 17.2435 8.02385C16.1663 6.77793 14.5988 6 12.8571 6C9.64167 6 7 8.66675 7 12C7 15.3332 9.64167 18 12.8571 18C14.5988 18 16.1663 17.2221 17.2435 15.9762C17.6048 15.5584 18.2363 15.5125 18.654 15.8737C19.0718 16.2349 19.1177 16.8665 18.7565 17.2842C17.5575 18.6709 15.8889 19.6355 14 19.9159V21C14 21.5523 13.5523 22 13 22C12.4477 22 12 21.5523 12 21V19.9531C8.04872 19.5176 5 16.1063 5 12C5 7.8937 8.04872 4.48236 12 4.04693V3C12 2.44772 12.4477 2 13 2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cent-sign', CentSign);
