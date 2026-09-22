import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CircleStop: React.FC<IconComponentProps> = ({
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
        <><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9 10.6C9 10.0399 9 9.75992 9.10899 9.54601C9.20487 9.35785 9.35785 9.20487 9.54601 9.10899C9.75992 9 10.0399 9 10.6 9H13.4C13.9601 9 14.2401 9 14.454 9.10899C14.6422 9.20487 14.7951 9.35785 14.891 9.54601C15 9.75992 15 10.0399 15 10.6V13.4C15 13.9601 15 14.2401 14.891 14.454C14.7951 14.6422 14.6422 14.7951 14.454 14.891C14.2401 15 13.9601 15 13.4 15H10.6C10.0399 15 9.75992 15 9.54601 14.891C9.35785 14.7951 9.20487 14.6422 9.10899 14.454C9 14.2401 9 13.9601 9 13.4V10.6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V12.8C8 13.9201 8 14.4802 8.21799 14.908C8.40973 15.2843 8.71569 15.5903 9.09202 15.782C9.51984 16 10.0799 16 11.2 16H12.8C13.9201 16 14.4802 16 14.908 15.782C15.2843 15.5903 15.5903 15.2843 15.782 14.908C16 14.4802 16 13.9201 16 12.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.71569 8.40973 8.40973 8.71569 8.21799 9.09202Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-stop', CircleStop);
