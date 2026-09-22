import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CodeAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M9.7348 7.32172C10.1094 7.72755 10.0841 8.3602 9.67828 8.73481L6.41526 11.7468L9.73279 15.3196C10.1086 15.7243 10.0852 16.357 9.68045 16.7328C9.27574 17.1086 8.64301 17.0852 8.26721 16.6805L4.26721 12.3728C4.08639 12.178 3.99051 11.9194 4.00074 11.6538C4.01097 11.3883 4.12646 11.1377 4.32172 10.9575L8.32172 7.2652C8.72754 6.8906 9.3602 6.9159 9.7348 7.32172ZM14.2652 7.32172C14.6398 6.9159 15.2725 6.8906 15.6783 7.2652L19.6783 10.9575C19.8735 11.1377 19.989 11.3883 19.9993 11.6538C20.0095 11.9194 19.9136 12.178 19.7328 12.3728L15.7328 16.6805C15.357 17.0852 14.7243 17.1086 14.3195 16.7328C13.9148 16.357 13.8914 15.7243 14.2672 15.3196L17.5847 11.7468L14.3217 8.73481C13.9159 8.3602 13.8906 7.72755 14.2652 7.32172Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('code-alt', CodeAlt);
