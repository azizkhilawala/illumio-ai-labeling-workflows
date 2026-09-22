import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MessageCircleArrowUp: React.FC<IconComponentProps> = ({
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
        <><path d="M14 11L12 9M12 9L10 11M12 9V15M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2.48854 19.5616C2.42003 19.7356 2.35537 19.8997 2.30007 20.05C2.11727 20.5465 1.83618 21.0502 2.17263 21.5548C2.3581 21.8329 2.67039 22 3.00471 22H12.0039C17.5267 22 22.0039 17.5228 22.0039 12C22.0039 6.47715 17.5267 2 12.0039 2C6.48105 2 2.00391 6.47715 2.00391 12C2.00391 13.595 2.37798 15.1053 3.04425 16.4457C3.37301 17.3161 2.87068 18.5914 2.48854 19.5616ZM13 11.4142V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V11.4142L10.7071 11.7071C10.3166 12.0976 9.68342 12.0976 9.29289 11.7071C8.90237 11.3166 8.90237 10.6834 9.29289 10.2929L11.2929 8.29289C11.6834 7.90237 12.3166 7.90237 12.7071 8.29289L14.7071 10.2929C15.0976 10.6834 15.0976 11.3166 14.7071 11.7071C14.3166 12.0976 13.6834 12.0976 13.2929 11.7071L13 11.4142Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('message-circle-arrow-up', MessageCircleArrowUp);
