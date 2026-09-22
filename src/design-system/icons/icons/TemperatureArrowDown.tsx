import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const TemperatureArrowDown: React.FC<IconComponentProps> = ({
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
        <><path d="M18 3V21M18 21L15 18M18 21L21 18M7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16ZM7 16V12M7 17L7.00707 17.0071M11 17C11 19.2091 9.20914 21 7 21C4.79086 21 3 19.2091 3 17C3 15.9856 3.37764 15.0593 4 14.3542L4 6.00017C4 4.34332 5.34315 3.00017 7 3.00017C8.65685 3.00017 10 4.34332 10 6.00017V14.3542C10.6224 15.0593 11 15.9856 11 17Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M19 3C19 2.44772 18.5523 2 18 2C17.4477 2 17 2.44772 17 3V18.5858L15.7071 17.2929C15.3166 16.9024 14.6834 16.9024 14.2929 17.2929C13.9024 17.6834 13.9024 18.3166 14.2929 18.7071L17.2929 21.7071C17.6834 22.0976 18.3166 22.0976 18.7071 21.7071L21.7071 18.7071C22.0976 18.3166 22.0976 17.6834 21.7071 17.2929C21.3166 16.9024 20.6834 16.9024 20.2929 17.2929L19 18.5858V3Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M7 2.00017C4.79086 2.00017 3 3.79103 3 6.00017V13.9996C2.37256 14.8351 2 15.875 2 17C2 19.7614 4.23858 22 7 22C9.76142 22 12 19.7614 12 17C12 15.875 11.6274 14.8351 11 13.9996V6.00017C11 3.79103 9.20914 2.00017 7 2.00017ZM8 12C8 11.4477 7.55228 11 7 11C6.44772 11 6 11.4477 6 12V15.2676C5.4022 15.6134 5 16.2597 5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17C9 16.2597 8.5978 15.6134 8 15.2676V12Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('temperature-arrow-down', TemperatureArrowDown);
