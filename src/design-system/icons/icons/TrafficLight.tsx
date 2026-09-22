import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const TrafficLight: React.FC<IconComponentProps> = ({
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
        <><path d="M7 6.2C7 5.0799 7 4.51984 7.21799 4.09202C7.40973 3.71569 7.71569 3.40973 8.09202 3.21799C8.51984 3 9.0799 3 10.2 3H13.8C14.9201 3 15.4802 3 15.908 3.21799C16.2843 3.40973 16.5903 3.71569 16.782 4.09202C17 4.51984 17 5.0799 17 6.2V16C17 18.7614 14.7614 21 12 21C9.23858 21 7 18.7614 7 16V6.2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.5 6.5C12.5 6.77614 12.2761 7 12 7C11.7239 7 11.5 6.77614 11.5 6.5C11.5 6.22386 11.7239 6 12 6C12.2761 6 12.5 6.22386 12.5 6.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.5 11.5C12.5 11.7761 12.2761 12 12 12C11.7239 12 11.5 11.7761 11.5 11.5C11.5 11.2239 11.7239 11 12 11C12.2761 11 12.5 11.2239 12.5 11.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.5 16.5C12.5 16.7761 12.2761 17 12 17C11.7239 17 11.5 16.7761 11.5 16.5C11.5 16.2239 11.7239 16 12 16C12.2761 16 12.5 16.2239 12.5 16.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M13.8385 2H10.1615C9.63433 1.99998 9.17954 1.99997 8.80497 2.03057C8.40963 2.06287 8.01641 2.13419 7.63803 2.32698C7.07354 2.6146 6.6146 3.07354 6.32698 3.63803C6.13419 4.01641 6.06287 4.40963 6.03057 4.80497C5.99997 5.17954 5.99998 5.63429 6 6.16142V16C6 19.3137 8.68629 22 12 22C15.3137 22 18 19.3137 18 16V6.16148C18 5.63433 18 5.17954 17.9694 4.80497C17.9371 4.40963 17.8658 4.01641 17.673 3.63803C17.3854 3.07354 16.9265 2.6146 16.362 2.32698C15.9836 2.13419 15.5904 2.06287 15.195 2.03057C14.8205 1.99997 14.3657 1.99998 13.8385 2ZM10.5 6.5C10.5 5.67157 11.1716 5 12 5C12.8284 5 13.5 5.67157 13.5 6.5C13.5 7.32843 12.8284 8 12 8C11.1716 8 10.5 7.32843 10.5 6.5ZM10.5 11.5C10.5 10.6716 11.1716 10 12 10C12.8284 10 13.5 10.6716 13.5 11.5C13.5 12.3284 12.8284 13 12 13C11.1716 13 10.5 12.3284 10.5 11.5ZM12 15C11.1716 15 10.5 15.6716 10.5 16.5C10.5 17.3284 11.1716 18 12 18C12.8284 18 13.5 17.3284 13.5 16.5C13.5 15.6716 12.8284 15 12 15Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('traffic-light', TrafficLight);
