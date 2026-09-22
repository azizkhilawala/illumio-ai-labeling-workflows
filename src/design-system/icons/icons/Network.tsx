import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Network: React.FC<IconComponentProps> = ({
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
<path d="M11.4857 2.2572H6.91428V5.91434H11.4857V2.2572Z" fill={color}/>
<path d="M8.28569 10.4857H3.71426V14.1429H8.28569V10.4857Z" fill={color}/>
<path d="M14.6857 10.4857H10.1143V14.1429H14.6857V10.4857Z" fill={color}/>
<path d="M15.6 7.74292H2.79999V8.65721H15.6V7.74292Z" fill={color}/>
<path d="M6.45713 8.20007H5.54285V12.3144H6.45713V8.20007Z" fill={color}/>
<path d="M9.65714 4.08582H8.74286V8.2001H9.65714V4.08582Z" fill={color}/>
<path d="M12.8571 8.20007H11.9428V12.3144H12.8571V8.20007Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('network', Network);
