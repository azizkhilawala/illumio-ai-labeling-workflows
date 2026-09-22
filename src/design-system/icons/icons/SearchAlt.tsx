import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const SearchAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M18.0437 16.6029C19.2682 15.0655 20 13.1182 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.1318 20 15.0905 19.2588 16.6324 18.0201L20.2903 21.7046C20.6795 22.0965 21.3126 22.0988 21.7046 21.7097C22.0965 21.3205 22.0988 20.6874 21.7097 20.2954L18.0437 16.6029Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('search-alt', SearchAlt);
