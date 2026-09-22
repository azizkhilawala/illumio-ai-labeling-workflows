import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CirclePlugAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M17.4009 19.2C19.5864 17.558 21 14.9441 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21V16M10 8V11M14 8V11M8 11H16V12.8C16 13.9201 16 14.4802 15.782 14.908C15.5903 15.2843 15.2843 15.5903 14.908 15.782C14.4802 16 13.9201 16 12.8 16H11.2C10.0799 16 9.51984 16 9.09202 15.782C8.71569 15.5903 8.40973 15.2843 8.21799 14.908C8 14.4802 8 13.9201 8 12.8V11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M13 21.9506C18.0533 21.4489 22 17.1853 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.1853 5.94668 21.4489 11 21.9506V17H10C8.34315 17 7 15.6569 7 14V11C7 10.4477 7.44772 10 8 10H9V8C9 7.44772 9.44771 7 10 7C10.5523 7 11 7.44772 11 8V10H13V8C13 7.44772 13.4477 7 14 7C14.5523 7 15 7.44772 15 8V10H16C16.5523 10 17 10.4477 17 11V14C17 15.6569 15.6569 17 14 17H13V21.9506Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-plug-alt', CirclePlugAlt);
