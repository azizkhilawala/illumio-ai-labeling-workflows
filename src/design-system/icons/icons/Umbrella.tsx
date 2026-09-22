import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Umbrella: React.FC<IconComponentProps> = ({
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
        <><path d="M8 19C8 20.1046 8.89543 21 10 21C11.1046 21 12 20.1046 12 19V11M12 11C13.1256 11 14.1643 11.3719 15 11.9996C15.8357 11.3719 16.8744 11 18 11C19.1258 11 20.1643 11.3721 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3.83566 11.3723 4.87439 11 6 11C7.12561 11 8.16434 11.3719 9 11.9996C9.83566 11.3719 10.8744 11 12 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.3789 21.7858 12.7253 21.4468 12.8946C21.1078 13.0639 20.7023 13.0271 20.3993 12.7995C19.7307 12.2972 18.9017 12 18 12C17.0984 12 16.269 12.2971 15.6006 12.7992C15.2448 13.0664 14.7552 13.0664 14.3994 12.7992C13.9872 12.4896 13.5138 12.2579 13 12.1258V19C13 20.6569 11.6569 22 10 22C8.34315 22 7 20.6569 7 19C7 18.4477 7.44772 18 8 18C8.55228 18 9 18.4477 9 19C9 19.5523 9.44772 20 10 20C10.5523 20 11 19.5523 11 19V12.1258C10.4862 12.2579 10.0128 12.4896 9.60058 12.7992C9.24479 13.0664 8.75521 13.0664 8.39942 12.7992C7.73099 12.2971 6.90163 12 6 12C5.09859 12 4.2692 12.2973 3.60058 12.7996C3.29762 13.0271 2.89207 13.0639 2.55311 12.8946C2.21415 12.7253 2 12.3789 2 12Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('umbrella', Umbrella);
