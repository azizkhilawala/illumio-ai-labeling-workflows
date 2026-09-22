import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const PrivateAddress: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><circle cx="9" cy="9" r="9" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M9.20266 2.80005C12.1064 2.80005 13.8545 5.04752 13.8545 7.47038C13.8545 9.89324 12.8769 10.9621 11.9109 12.3121C11.2669 13.2122 10.3642 14.3081 9.20266 15.6C7.87965 14.2899 6.91174 13.1939 6.29891 12.3121C5.37966 10.9894 4.54546 9.89324 4.54546 7.47038C4.54546 5.04752 6.29891 2.80005 9.20266 2.80005ZM9.20046 4.40005C8.34358 4.40005 7.64402 5.07364 7.60241 5.92019L7.60046 6.00005L7.60026 6.80005H6.80046V10H11.6005V6.80005H10.8003L10.8005 6.00005C10.8005 5.11639 10.0841 4.40005 9.20046 4.40005ZM9.20046 5.20005C9.64228 5.20005 10.0005 5.55822 10.0005 6.00005V6.80005H8.40046V6.00005C8.40046 5.55822 8.75863 5.20005 9.20046 5.20005Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('private-address', PrivateAddress);
