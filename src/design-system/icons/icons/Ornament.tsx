import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Ornament: React.FC<IconComponentProps> = ({
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
        <><path d="M5.07089 13H18.9291M18.3264 17H5.70312M8 6H16V8.25469C17.8135 9.51964 19 11.6213 19 14C19 17.866 15.866 21 12 21C8.13401 21 5 17.866 5 14C5 11.6213 6.18652 9.51964 8 8.25469V6ZM13.5 4.5C13.5 5.32843 12.8284 6 12 6C11.1716 6 10.5 5.32843 10.5 4.5C10.5 3.67157 11.1716 3 12 3C12.8284 3 13.5 3.67157 13.5 4.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M14.5 4.5C14.5 4.67123 14.4828 4.83845 14.45 5H16C16.5523 5 17 5.44772 17 6V7.7547C18.328 8.8192 19.3102 10.3001 19.7478 12H4.25215C4.68982 10.3001 5.67205 8.8192 7 7.7547V6C7 5.44772 7.44772 5 8 5H9.55001C9.51722 4.83845 9.5 4.67123 9.5 4.5C9.5 3.11929 10.6193 2 12 2C13.3807 2 14.5 3.11929 14.5 4.5ZM11.5 4.5C11.5 4.22386 11.7239 4 12 4C12.2761 4 12.5 4.22386 12.5 4.5C12.5 4.77614 12.2761 5 12 5C11.7239 5 11.5 4.77614 11.5 4.5Z" fill={color}/>
<path d="M4 14C4 14.6906 4.08751 15.3608 4.25203 16H19.748C19.9125 15.3608 20 14.6906 20 14L4 14Z" fill={color}/>
<path d="M18.9297 18H5.07025C6.45349 20.3912 9.03887 22 12 22C14.9611 22 17.5465 20.3912 18.9297 18Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('ornament', Ornament);
