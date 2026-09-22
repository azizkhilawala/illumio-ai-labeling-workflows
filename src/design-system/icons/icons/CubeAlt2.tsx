import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CubeAlt2: React.FC<IconComponentProps> = ({
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
        <><path d="M4 7.5L11.6078 3.22062C11.7509 3.14014 11.8224 3.09991 11.8982 3.08414C11.9654 3.07019 12.0346 3.07019 12.1018 3.08414C12.1776 3.09991 12.2491 3.14014 12.3922 3.22062L20 7.5M4 7.5V16.0321C4 16.2025 4 16.2876 4.02499 16.3637C4.04711 16.431 4.08326 16.4928 4.13106 16.545C4.1851 16.6041 4.25933 16.6459 4.40779 16.7294L12 21M4 7.5L12 11.5M12 21L19.5922 16.7294C19.7407 16.6459 19.8149 16.6041 19.8689 16.545C19.9167 16.4928 19.9529 16.431 19.975 16.3637C20 16.2876 20 16.2025 20 16.0321V7.5M12 21V11.5M20 7.5L12 11.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12.4903 2.12842C12.1858 1.95719 11.8142 1.95719 11.5097 2.12842L3.97231 6.36823L12.0002 10.3822L20.0279 6.36835L12.4903 2.12842Z" fill={color}/>
<path d="M21 8.11836L13.0002 12.1183V21.5847L20.4903 17.3716C20.8051 17.1945 21 16.8613 21 16.5V8.11836Z" fill={color}/>
<path d="M11.0002 21.585V12.1183L3 8.11814V16.5C3 16.8613 3.19486 17.1945 3.50974 17.3716L11.0002 21.585Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cube-alt-2', CubeAlt2);
