import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CandleHolder: React.FC<IconComponentProps> = ({
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
        <><path d="M13 21V11H5V21M19 21C20.1046 21 21 20.1046 21 19C21 17.8954 20.1046 17 19 17C17.8954 17 17 17.8954 17 19C17 20.1046 17.8954 21 19 21ZM19 21H3M8 11V14M9 8C9.89682 8 10.6558 7.40972 10.9095 6.59649C11.0272 6.21956 10.8831 5.82469 10.6641 5.49615L9 3L7.3359 5.49615C7.11688 5.82469 6.97284 6.21956 7.09046 6.59649C7.34423 7.40972 8.10318 8 9 8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M9.89091 2.4453C9.70544 2.1671 9.39321 2 9.05886 2C8.72451 2 8.41227 2.1671 8.22681 2.4453L6.89861 4.4376C6.64295 4.82109 6.3792 5.31434 6.26196 5.85742C6.14104 6.41751 6.16674 7.09439 6.59259 7.70839C7.1325 8.48684 8.03566 9 9.05886 9C10.0821 9 10.9852 8.48684 11.5251 7.70839C11.951 7.09439 11.9767 6.41751 11.8558 5.85742C11.7385 5.31434 11.4748 4.82109 11.2191 4.4376L9.89091 2.4453Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M7 10H5C4.44772 10 4 10.4477 4 11V20H3C2.44772 20 2 20.4477 2 21C2 21.5523 2.44772 22 3 22H19C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 19.3506 16.0602 19.6872 16.1707 20H14V11C14 10.4477 13.5523 10 13 10H9V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V10ZM18 19C18 18.4477 18.4477 18 19 18C19.5523 18 20 18.4477 20 19C20 19.5523 19.5523 20 19 20C18.4477 20 18 19.5523 18 19Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('candle-holder', CandleHolder);
