import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Mesh: React.FC<IconComponentProps> = ({
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
<path fillRule="evenodd" clipRule="evenodd" d="M4.25455 5.12732H2.8V13.2728H3.96364L8.61818 9.95641V13.2728H9.78182V9.95641L14.4364 13.2728H15.6V5.12732H14.4364L12.0218 6.87277H9.78182V5.12732H8.61818V6.65459L4.25455 5.12732ZM3.96364 8.7055V5.62186L8.32728 7.16368L3.96364 8.7055ZM3.96364 10.7128V9.28732L8.61818 7.65823V9.11277L3.96364 10.7128ZM3.96364 12.5164V11.3237L7.28 10.1891L3.96364 12.5164ZM14.4364 12.5164L9.78182 9.25823V9.14186L11.1782 8.15277L14.4364 9.31641V12.5164ZM14.4364 7.45459V8.7055L11.76 7.7455L12.1964 7.45459H14.4364ZM14.4364 6.87277H13.04L14.4364 5.88368V6.87277ZM9.78182 8.44368V7.65823L10.5091 7.92005L9.78182 8.44368Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('mesh', Mesh);
