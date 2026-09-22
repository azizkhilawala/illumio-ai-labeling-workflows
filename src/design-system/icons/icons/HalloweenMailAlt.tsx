import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const HalloweenMailAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M3 12V14L4 15M4 15L7 14L9 15M4 15L3 16M7 6L5 5H3V9L12 13L21 9V5H12M7 6L9 8M7 6L9 5M21 17V19H19M21 13H19C18.4477 13 18 13.4477 18 14C18 14.5523 17.5523 15 17 15H16.5C15.6716 15 15 15.6716 15 16.5V17C15 18.1046 14.1046 19 13 19H3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M2 5C2 4.87667 2.02233 4.75856 2.06316 4.64948L6.40786 6.82183L8.29311 8.70708C8.68364 9.09761 9.3168 9.09761 9.70733 8.70708C10.0979 8.31656 10.0979 7.68339 9.70733 7.29287L8.68838 6.27393L9.44743 5.8944C9.94141 5.64741 10.1416 5.04674 9.89465 4.55276C9.72296 4.20938 9.38036 4.00794 9.0215 4H21C21.5523 4 22 4.44772 22 5V7.46135L12.002 11.9049L2 7.42125V5Z" fill={color}/>
<path d="M5.23634 4H8.97739C8.83426 4.00317 8.68956 4.03727 8.55301 4.10555L7.00022 4.88194L5.23634 4Z" fill={color}/>
<path d="M22 9.64999L12.4064 13.9138C12.1468 14.0292 11.8504 14.0287 11.5912 13.9125L4 10.5096V13.5858L4.27009 13.8559L6.68377 13.0513C6.93538 12.9674 7.21 12.987 7.44721 13.1056L9.44721 14.1056C9.94119 14.3526 10.1414 14.9532 9.89443 15.4472C9.64744 15.9412 9.04676 16.1414 8.55279 15.8944L6.92327 15.0797L4.54018 15.874L3.70711 16.7071C3.31658 17.0976 2.68342 17.0976 2.29289 16.7071C2.09763 16.5118 2 16.2559 2 16V19C2 19.5523 2.44772 20 3 20H14V16.5C14 15.1193 15.1193 14 16.5 14H17C17 12.8954 17.8954 12 19 12H22V9.64999Z" fill={color}/>
<path d="M19 14H21V18C21 18.5523 20.5523 19 20 19H16V16.5C16 16.2239 16.2239 16 16.5 16H17C18.1046 16 19 15.1046 19 14Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('halloween-mail-alt', HalloweenMailAlt);
