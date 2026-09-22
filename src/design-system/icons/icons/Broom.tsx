import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Broom: React.FC<IconComponentProps> = ({
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
        <><path d="M21 3L13.25 10.75M9.46072 11.0727L11 8.5L13.25 10.75M12.9273 14.5393L15.5 13L13.25 10.75M3 21L4.19847 15.0076C4.66453 12.6774 6.71058 11 9.087 11C9.35144 11 9.60505 11.105 9.79203 11.292L12.708 14.208C12.895 14.395 13 14.6486 13 14.913C13 17.2894 11.3226 19.3355 8.99237 19.8015L3 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M21.7071 2.29289C22.0976 2.68342 22.0976 3.31658 21.7071 3.70711L14.6642 10.75L16.2071 12.2929C16.4249 12.5106 16.5301 12.8166 16.4925 13.1222C16.4549 13.4278 16.2786 13.6991 16.0145 13.8575L13.998 15.0674C13.9269 17.8543 11.9356 20.2327 9.1885 20.7821L3.19613 21.9806C2.86827 22.0462 2.52933 21.9435 2.29291 21.7071C2.05649 21.4707 1.95386 21.1317 2.01944 20.8039L3.21791 14.8115C3.76733 12.0644 6.1457 10.0731 8.93264 10.002L10.1425 7.9855C10.301 7.72145 10.5722 7.54512 10.8778 7.50749C11.1835 7.46987 11.4894 7.57515 11.7071 7.79289L13.25 9.33579L20.2929 2.29289C20.6834 1.90237 21.3166 1.90237 21.7071 2.29289ZM10.7592 10.845L13.155 13.2408L13.8873 12.8015L11.1986 10.1128L10.7592 10.845Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('broom', Broom);
