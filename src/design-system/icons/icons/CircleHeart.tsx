import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CircleHeart: React.FC<IconComponentProps> = ({
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
<path fillRule="evenodd" clipRule="evenodd" d="M11.9973 9.33059C11.1975 8.4216 9.8639 8.17708 8.86188 9.00945C7.85986 9.84182 7.71879 11.2335 8.50568 12.2179C8.97361 12.8033 10.1197 13.8531 10.9719 14.6079C11.3237 14.9195 11.4996 15.0753 11.7114 15.1385C11.8925 15.1926 12.102 15.1926 12.2832 15.1385C12.4949 15.0753 12.6708 14.9195 13.0226 14.6079C13.8748 13.8531 15.0209 12.8033 15.4888 12.2179C16.2757 11.2335 16.1519 9.83306 15.1326 9.00945C14.1134 8.18584 12.797 8.4216 11.9973 9.33059Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM8.22311 8.24042C9.41046 7.2541 10.8905 7.32263 11.9969 8.027C13.1012 7.32326 14.5678 7.26735 15.7614 8.23184C17.2153 9.40673 17.3952 11.4351 16.2702 12.8425C15.737 13.5096 14.5167 14.6208 13.6858 15.3567C13.4064 15.6042 13.0432 15.9556 12.5693 16.097C12.2016 16.2067 11.7934 16.2067 11.4257 16.097C10.9866 15.966 10.6445 15.6538 10.3091 15.3567C9.47822 14.6208 8.25796 13.5096 7.72477 12.8425C6.59061 11.4236 6.81061 9.41377 8.22311 8.24042Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-heart', CircleHeart);
