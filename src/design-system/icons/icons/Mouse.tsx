import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Mouse: React.FC<IconComponentProps> = ({
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
        <><path d="M13.3631 21C10.4012 21 8 18.5989 8 15.6369V5.67924C8 3.81038 9.7563 2.4391 11.5694 2.89236L16.6422 4.16057C18.6156 4.65392 20 6.42702 20 8.46115V14.3631C20 18.0286 17.0286 21 13.3631 21ZM13.3631 21H13C8.02944 21 4 17.8223 4 13.9024C4 11.4416 5.58803 9.27327 8 8.00002M14 8.00002V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M7 5.67924C7 3.15981 9.36769 1.31117 11.8119 1.92222L16.8847 3.19043C19.3033 3.79508 21 5.96816 21 8.46115V14.3632C21 18.5809 17.5809 22 13.3631 22H13C12.9191 22 12.8405 21.9904 12.7652 21.9723C9.53131 21.6709 7 18.9495 7 15.6369V5.67924ZM15 8C15 7.44772 14.5523 7 14 7C13.4477 7 13 7.44772 13 8V10C13 10.5523 13.4477 11 14 11C14.5523 11 15 10.5523 15 10V8Z" fill={color}/>
<path d="M6 8.11279C4.1866 9.55104 3 11.5817 3 13.9024C3 17.1524 5.27163 19.7932 8.43074 21.1039C6.93809 19.7564 6 17.8062 6 15.6369V8.11279Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('mouse', Mouse);
