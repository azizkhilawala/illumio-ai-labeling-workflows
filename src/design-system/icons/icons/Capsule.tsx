import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Capsule: React.FC<IconComponentProps> = ({
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
        <><path d="M15.5005 8.50001L8.50053 15.5M11.5005 4.50001L19.5005 12.5C21.4335 14.433 21.4335 17.567 19.5005 19.5C17.5675 21.433 14.4335 21.433 12.5005 19.5L4.50053 11.5C2.56753 9.56701 2.56753 6.43301 4.50053 4.50001C6.43353 2.56701 9.56753 2.56701 11.5005 4.50001Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M10.7934 5.20712C9.25095 3.66464 6.75011 3.66464 5.20764 5.20712C3.66516 6.74959 3.66516 9.25043 5.20764 10.7929L8.50053 14.0858L14.0863 8.50001L10.7934 5.20712ZM12.2076 3.7929C9.88411 1.46938 6.11694 1.46938 3.79342 3.7929C1.4699 6.11642 1.4699 9.8836 3.79342 12.2071L11.7934 20.2071C14.1169 22.5306 17.8841 22.5306 20.2076 20.2071C22.5312 17.8836 22.5312 14.1164 20.2076 11.7929L12.2076 3.7929Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('capsule', Capsule);
