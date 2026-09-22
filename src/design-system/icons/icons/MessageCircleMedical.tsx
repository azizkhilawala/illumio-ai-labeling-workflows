import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MessageCircleMedical: React.FC<IconComponentProps> = ({
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
        <><path d="M10 12H14M12 10V14M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2.48854 19.5616C2.42003 19.7356 2.35537 19.8997 2.30007 20.05C2.23023 20.2397 2.15877 20.4291 2.08136 20.6158C1.95297 20.9244 1.98721 21.2767 2.17263 21.5548C2.3581 21.8329 2.67039 22 3.00471 22H12.0039C17.5267 22 22.0039 17.5228 22.0039 12C22.0039 6.47715 17.5267 2 12.0039 2C6.48105 2 2.00391 6.47715 2.00391 12C2.00391 13.595 2.37798 15.1053 3.04425 16.4457C3.37301 17.3161 2.87068 18.5914 2.48854 19.5616ZM11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10V11H14C14.5523 11 15 11.4477 15 12C15 12.5523 14.5523 13 14 13H13V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V13H10C9.44772 13 9 12.5523 9 12C9 11.4477 9.44772 11 10 11H11V10Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('message-circle-medical', MessageCircleMedical);
