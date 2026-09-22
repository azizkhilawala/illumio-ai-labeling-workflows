import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const TentArrowDownToLine: React.FC<IconComponentProps> = ({
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
        <><path d="M5 3V9M5 9L3 7M5 9L7 7M3 21H6M6 21H13M6 21L6.84337 14.253C6.90126 13.7899 6.9302 13.5584 7.00783 13.3457C7.07667 13.157 7.17353 12.9798 7.29516 12.82C7.43232 12.6397 7.61157 12.4904 7.97007 12.1916L13 8M13 21H17M13 21V15M17 21H20M17 21L13 15M20 21H21M20 21L19.1566 14.253C19.0987 13.79 19.0698 13.5584 18.9922 13.3457C18.9233 13.157 18.8265 12.9798 18.7048 12.82C18.5677 12.6397 18.3884 12.4904 18.0299 12.1916L13 8M13 8V15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3V6.58579L3.70711 6.29289C3.31658 5.90237 2.68342 5.90237 2.29289 6.29289C1.90237 6.68342 1.90237 7.31658 2.29289 7.70711L4.29289 9.70711C4.68342 10.0976 5.31658 10.0976 5.70711 9.70711L7.70711 7.70711C8.09763 7.31658 8.09763 6.68342 7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289L6 6.58579V3Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M13.6727 7.26006C13.2913 6.91331 12.7087 6.91331 12.3273 7.26006L6.82733 12.2601C6.66618 12.4066 6.55726 12.6017 6.51713 12.8157L5.17007 20H3C2.44772 20 2 20.4477 2 21C2 21.5523 2.44772 22 3 22H5.98222C5.99486 22.0002 6.00746 22.0002 6.02003 22H16.9863C16.996 22.0001 17.0058 22.0001 17.0155 22H19.98C19.9925 22.0002 20.0051 22.0002 20.0178 22H21C21.5523 22 22 21.5523 22 21C22 20.4477 21.5523 20 21 20H20.8299L19.4829 12.8157C19.4427 12.6017 19.3338 12.4066 19.1727 12.2601L13.6727 7.26006ZM13 20H16.5L13 15V20Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('tent-arrow-down-to-line', TentArrowDownToLine);
