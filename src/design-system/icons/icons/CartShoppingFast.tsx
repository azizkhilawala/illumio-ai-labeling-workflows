import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CartShoppingFast: React.FC<IconComponentProps> = ({
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
        <><path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 3C3 2.44772 3.44772 2 4 2H7C7.49357 2 7.91332 2.36011 7.98837 2.84794L8.16561 4H22C22.3138 4 22.6094 4.14729 22.7984 4.3978C22.9874 4.64832 23.0478 4.973 22.9616 5.27472L20.9616 12.2747C20.8389 12.704 20.4465 13 20 13H9.55023L9.85792 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H9C8.50643 17 8.08668 16.6399 8.01163 16.1521C7.38843 12.1013 6.76519 8.0502 6.14208 4H4C3.44772 4 3 3.55228 3 3ZM1 8C1 7.44772 1.44772 7 2 7H4C4.55228 7 5 7.44772 5 8C5 8.55228 4.55228 9 4 9H2C1.44772 9 1 8.55228 1 8ZM1 11C1 10.4477 1.44772 10 2 10H5C5.55228 10 6 10.4477 6 11C6 11.5523 5.55228 12 5 12H2C1.44772 12 1 11.5523 1 11ZM1 14C1 13.4477 1.44772 13 2 13H6C6.55228 13 7 13.4477 7 14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14ZM7 20C7 18.8954 7.89543 18 9 18C10.1046 18 11 18.8954 11 20C11 21.1046 10.1046 22 9 22C7.89543 22 7 21.1046 7 20ZM18 20C18 18.8954 18.8954 18 20 18C21.1046 18 22 18.8954 22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cart-shopping-fast', CartShoppingFast);
