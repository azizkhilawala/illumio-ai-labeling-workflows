import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const WebcamAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M12 17C15.866 17 19 13.866 19 10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10C5 13.866 8.13401 17 12 17ZM12 17V21M7 21H12M12 21H17M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M13 17.9381C16.9463 17.446 20 14.0796 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.0796 7.05369 17.446 11 17.9381V20H7C6.44772 20 6 20.4477 6 21C6 21.5523 6.44771 22 7 22H17C17.5523 22 18 21.5523 18 21C18 20.4477 17.5523 20 17 20H13V17.9381ZM12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('webcam-alt', WebcamAlt);
