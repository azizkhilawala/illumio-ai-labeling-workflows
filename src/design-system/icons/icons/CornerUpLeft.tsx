import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CornerUpLeft: React.FC<IconComponentProps> = ({
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
        <><path d="M20 20V17.6C20 14.2397 20 12.5595 19.346 11.2761C18.7708 10.1471 17.8529 9.2292 16.7239 8.65396C15.4405 8 13.7603 8 10.4 8H4M4 8L8 12M4 8L8 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8.70711 3.29289C9.09763 3.68342 9.09763 4.31658 8.70711 4.70711L6.41421 7H10.4444C12.087 6.99999 13.3809 6.99999 14.4222 7.08507C15.4846 7.17186 16.3717 7.35217 17.1779 7.76295C18.4951 8.43407 19.5659 9.50493 20.237 10.8221C20.6478 11.6283 20.8281 12.5154 20.9149 13.5778C21 14.6191 21 15.913 21 17.5556V20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20V17.6C19 15.9033 18.9992 14.691 18.9216 13.7406C18.8449 12.802 18.6982 12.2073 18.455 11.73C17.9757 10.7892 17.2108 10.0243 16.27 9.54497C15.7927 9.30179 15.198 9.15512 14.2594 9.07842C13.309 9.00078 12.0967 9 10.4 9H6.41421L8.70711 11.2929C9.09763 11.6834 9.09763 12.3166 8.70711 12.7071C8.31658 13.0976 7.68342 13.0976 7.29289 12.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289L7.29289 3.29289C7.68342 2.90237 8.31658 2.90237 8.70711 3.29289Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('corner-up-left', CornerUpLeft);
