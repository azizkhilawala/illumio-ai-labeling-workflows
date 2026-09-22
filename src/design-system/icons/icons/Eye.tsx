import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Eye: React.FC<IconComponentProps> = ({
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
        <><path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11.999 14C13.1036 14 13.999 13.1046 13.999 12C13.999 10.8954 13.1036 10 11.999 10C10.8945 10 9.99902 10.8954 9.99902 12C9.99902 13.1046 10.8945 14 11.999 14Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M1.50298 11.7003C2.9044 7.23842 7.07231 4 11.9992 4C16.9261 4 21.0941 7.23846 22.4955 11.7004C22.5567 11.8955 22.5567 12.1046 22.4955 12.2997C21.0941 16.7616 16.9261 20 11.9992 20C7.07231 20 2.90438 16.7615 1.50298 12.2996C1.44171 12.1045 1.44171 11.8954 1.50298 11.7003ZM7.99902 12C7.99902 9.79086 9.78988 8 11.999 8C14.2082 8 15.999 9.79086 15.999 12C15.999 14.2091 14.2082 16 11.999 16C9.78988 16 7.99902 14.2091 7.99902 12Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('eye', Eye);
