import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CediSign: React.FC<IconComponentProps> = ({
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
        <><path d="M18 7.36981C16.7435 5.91657 14.9052 5 12.8571 5C9.07005 5 6 8.13401 6 12C6 15.866 9.07005 19 12.8571 19C14.9052 19 16.7435 18.0834 18 16.6302M13 21V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 4.04688V3C12 2.44772 12.4477 2 13 2C13.5523 2 14 2.44772 14 3V4.08402C15.8889 4.36443 17.5575 5.329 18.7565 6.71572C19.1177 7.1335 19.0718 7.765 18.654 8.12622C18.2363 8.48743 17.6048 8.44158 17.2435 8.0238C16.4081 7.05752 15.2778 6.37274 14 6.11402V17.8859C15.2778 17.6272 16.4081 16.9424 17.2435 15.9761C17.6048 15.5583 18.2363 15.5125 18.654 15.8737C19.0718 16.2349 19.1177 16.8664 18.7565 17.2842C17.5575 18.6709 15.8889 19.6355 14 19.9159V21C14 21.5523 13.5523 22 13 22C12.4477 22 12 21.5523 12 21V19.9531C8.04872 19.5176 5 16.1063 5 11.9999C5 7.89364 8.04872 4.48231 12 4.04688ZM12 6.06396C9.18528 6.48796 7 8.96828 7 11.9999C7 15.0316 9.18528 17.5119 12 17.9359V6.06396Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cedi-sign', CediSign);
