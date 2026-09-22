import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const WifiFair: React.FC<IconComponentProps> = ({
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
        <><path d="M12.0001 20H12.0101M15.3635 16.3003C14.4754 15.4924 13.2953 15 12.0001 15C10.705 15 9.52483 15.4924 8.63672 16.3003" stroke={color} strokeWidth="2" strokeLinecap="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12.0001 16C10.9634 16 10.0208 16.3931 9.30961 17.04C8.90107 17.4116 8.26861 17.3817 7.89698 16.9732C7.52536 16.5646 7.55529 15.9322 7.96384 15.5605C9.02883 14.5918 10.4465 14 12.0001 14C13.5537 14 14.9714 14.5918 16.0364 15.5605C16.4449 15.9322 16.4749 16.5646 16.1032 16.9732C15.7316 17.3817 15.0992 17.4116 14.6906 17.04C13.9794 16.3931 13.0368 16 12.0001 16ZM11.0001 20C11.0001 19.4477 11.4478 19 12.0001 19H12.0101C12.5624 19 13.0101 19.4477 13.0101 20C13.0101 20.5523 12.5624 21 12.0101 21H12.0001C11.4478 21 11.0001 20.5523 11.0001 20Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('wifi-fair', WifiFair);
