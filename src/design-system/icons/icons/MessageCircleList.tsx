import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MessageCircleList: React.FC<IconComponentProps> = ({
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
        <><path d="M10 10H17M10 14H17M7 10H7.01M7 14H7.01M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2.48854 19.5616C2.42003 19.7356 2.35537 19.8997 2.30007 20.05C2.23023 20.2397 2.15877 20.4291 2.08136 20.6158C1.95297 20.9244 1.98721 21.2767 2.17263 21.5548C2.3581 21.8329 2.67039 22 3.00471 22H12.0039C17.5267 22 22.0039 17.5228 22.0039 12C22.0039 6.47715 17.5267 2 12.0039 2C6.48105 2 2.00391 6.47715 2.00391 12C2.00391 13.595 2.37798 15.1053 3.04425 16.4457C3.37301 17.3161 2.87068 18.5914 2.48854 19.5616ZM8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10C6 9.44771 6.44772 9 7 9C7.55228 9 8 9.44771 8 10ZM8 14C8 14.5523 7.55228 15 7 15C6.44772 15 6 14.5523 6 14C6 13.4477 6.44772 13 7 13C7.55228 13 8 13.4477 8 14ZM9 10C9 9.44771 9.44771 9 10 9H17C17.5523 9 18 9.44771 18 10C18 10.5523 17.5523 11 17 11H10C9.44771 11 9 10.5523 9 10ZM9 14C9 13.4477 9.44771 13 10 13H17C17.5523 13 18 13.4477 18 14C18 14.5523 17.5523 15 17 15H10C9.44771 15 9 14.5523 9 14Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('message-circle-list', MessageCircleList);
