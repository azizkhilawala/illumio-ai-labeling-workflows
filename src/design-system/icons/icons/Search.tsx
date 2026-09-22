import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Search: React.FC<IconComponentProps> = ({
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
        <><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M17.1701 15.7694C18.3159 14.3209 19 12.4903 19 10.5C19 5.80558 15.1944 2 10.5 2C5.80558 2 2 5.80558 2 10.5C2 15.1944 5.80558 19 10.5 19C12.4834 19 14.3081 18.3207 15.7542 17.182L20.294 21.7082C20.6851 22.0981 21.3182 22.0972 21.7082 21.706C22.0981 21.3149 22.0972 20.6818 21.706 20.2918L17.1701 15.7694Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('search', Search);
