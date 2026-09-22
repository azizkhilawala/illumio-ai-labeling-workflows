import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const RefreshCcwClock: React.FC<IconComponentProps> = ({
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
        <><path d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.61061 4 7.46589 5.04751 6 6.70835C5.91595 6.80358 5.83413 6.90082 5.75463 7M12 8V12L14.5 14.5M5.75391 4.00391V7.00391H8.75391" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6.75391 4.68643C8.23054 3.62558 10.0425 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C10.6773 5 9.44075 5.36633 8.38555 6.00391H8.75391C9.30619 6.00391 9.75391 6.45162 9.75391 7.00391C9.75391 7.55619 9.30619 8.00391 8.75391 8.00391H5.75391C5.20162 8.00391 4.75391 7.55619 4.75391 7.00391V4.00391C4.75391 3.45162 5.20162 3.00391 5.75391 3.00391C6.30619 3.00391 6.75391 3.45162 6.75391 4.00391V4.68643ZM12 7C12.5523 7 13 7.44772 13 8V11.5858L15.2071 13.7929C15.5976 14.1834 15.5976 14.8166 15.2071 15.2071C14.8166 15.5976 14.1834 15.5976 13.7929 15.2071L11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V8C11 7.44772 11.4477 7 12 7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('refresh-ccw-clock', RefreshCcwClock);
