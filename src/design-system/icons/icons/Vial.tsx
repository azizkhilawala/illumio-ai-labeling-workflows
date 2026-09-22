import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Vial: React.FC<IconComponentProps> = ({
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
        <><path d="M20 9L9.50038 19.5C8.11966 20.8807 5.88109 20.8807 4.50038 19.5C3.11967 18.1193 3.11967 15.8807 4.50038 14.5L15 4M14.0004 3L21.0004 10M7 12H17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M13.2933 2.29289C13.6838 1.90237 14.317 1.90237 14.7075 2.29289L21.7075 9.29289C22.098 9.68342 22.098 10.3166 21.7075 10.7071C21.317 11.0976 20.6838 11.0976 20.2933 10.7071L20.0002 10.414L10.2075 20.2071C8.43626 21.9783 5.56451 21.9783 3.79327 20.2071C2.02204 18.4359 2.02204 15.5641 3.79326 13.7929C7.0575 10.5285 10.3217 7.26419 13.586 3.99982L13.2933 3.70711C12.9027 3.31658 12.9027 2.68342 13.2933 2.29289ZM15.0002 5.41404L9.41444 11H16.5859L18.586 8.99982L15.0002 5.41404Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('vial', Vial);
