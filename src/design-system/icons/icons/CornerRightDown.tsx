import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CornerRightDown: React.FC<IconComponentProps> = ({
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
        <><path d="M4 4H6.4C9.76031 4 11.4405 4 12.7239 4.65396C13.8529 5.2292 14.7708 6.14708 15.346 7.27606C16 8.55953 16 10.2397 16 13.6L16 20M16 20L12 16M16 20L20 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M10.2594 5.07842C9.30901 5.00078 8.09666 5 6.4 5H4C3.44772 5 3 4.55229 3 4C3 3.44772 3.44772 3 4 3L6.44441 3C8.08696 2.99999 9.38091 2.99999 10.4222 3.08507C11.4846 3.17186 12.3717 3.35217 13.1779 3.76296C14.4951 4.43407 15.5659 5.50493 16.237 6.82207C16.6478 7.62827 16.8281 8.51543 16.9149 9.57778C17 10.6191 17 11.9131 17 13.5556L17 17.5858L19.2929 15.2929C19.6834 14.9024 20.3166 14.9024 20.7071 15.2929C21.0976 15.6834 21.0976 16.3166 20.7071 16.7071L16.7071 20.7071C16.3166 21.0976 15.6834 21.0976 15.2929 20.7071L11.2929 16.7071C10.9024 16.3166 10.9024 15.6834 11.2929 15.2929C11.6834 14.9024 12.3166 14.9024 12.7071 15.2929L15 17.5858L15 13.6C15 11.9033 14.9992 10.691 14.9216 9.74064C14.8449 8.80197 14.6982 8.20732 14.455 7.73005C13.9757 6.78924 13.2108 6.02433 12.27 5.54497C11.7927 5.30179 11.198 5.15512 10.2594 5.07842Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('corner-right-down', CornerRightDown);
