import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CartPlus: React.FC<IconComponentProps> = ({
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
        <><path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H6C6.49357 2 6.91332 2.36011 6.98837 2.84794L8.24253 11H18.2457L20.0385 4.72528C20.1902 4.19424 20.7437 3.88675 21.2747 4.03848C21.8058 4.1902 22.1132 4.74369 21.9615 5.27472L19.9615 12.2747C19.8389 12.704 19.4465 13 19 13H8.55023L8.85792 15H20C20.5523 15 21 15.4477 21 16C21 16.5523 20.5523 17 20 17H8C7.50643 17 7.08668 16.6399 7.01163 16.1521L6.41534 12.2762C6.3926 12.1969 6.37941 12.1136 6.37708 12.0275L5.14208 4H3C2.44772 4 2 3.55228 2 3ZM13.5 3C14.0523 3 14.5 3.44772 14.5 4V5.5H16C16.5523 5.5 17 5.94772 17 6.5C17 7.05228 16.5523 7.5 16 7.5H14.5V9C14.5 9.55228 14.0523 10 13.5 10C12.9477 10 12.5 9.55228 12.5 9V7.5H11C10.4477 7.5 10 7.05228 10 6.5C10 5.94772 10.4477 5.5 11 5.5H12.5V4C12.5 3.44772 12.9477 3 13.5 3ZM6 20C6 18.8954 6.89543 18 8 18C9.10457 18 10 18.8954 10 20C10 21.1046 9.10457 22 8 22C6.89543 22 6 21.1046 6 20ZM17 20C17 18.8954 17.8954 18 19 18C20.1046 18 21 18.8954 21 20C21 21.1046 20.1046 22 19 22C17.8954 22 17 21.1046 17 20Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cart-plus', CartPlus);
