import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const UserCheck: React.FC<IconComponentProps> = ({
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
        <><path d="M14.9999 15.2547C13.8661 14.4638 12.4872 14 10.9999 14C7.40399 14 4.44136 16.7114 4.04498 20.2013C4.01693 20.4483 4.0029 20.5718 4.05221 20.6911C4.09256 20.7886 4.1799 20.8864 4.2723 20.9375C4.38522 21 4.52346 21 4.79992 21H9.94465M13.9999 19.2857L15.7999 21L19.9999 17M14.9999 7C14.9999 9.20914 13.2091 11 10.9999 11C8.79078 11 6.99992 9.20914 6.99992 7C6.99992 4.79086 8.79078 3 10.9999 3C13.2091 3 14.9999 4.79086 14.9999 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 2C8.23858 2 6 4.23858 6 7C6 9.76142 8.23858 12 11 12C13.7614 12 16 9.76142 16 7C16 4.23858 13.7614 2 11 2Z" fill={color}/>
<path d="M11 13C6.58172 13 3 16.5817 3 21C3 21.5523 3.44772 22 4 22H12.5L11.931 21.4581C10.7312 20.3155 10.6849 18.4165 11.8276 17.2168C12.8832 16.1083 14.5844 15.9844 15.7834 16.873L17.0029 15.7116C15.5369 14.0489 13.3909 13 11 13Z" fill={color}/>
<path d="M20.6897 17.7241C21.0896 17.3433 21.105 16.7103 20.7241 16.3103C20.3433 15.9104 19.7103 15.895 19.3103 16.2759L15.8 19.619L14.6897 18.5616C14.2897 18.1807 13.6567 18.1961 13.2759 18.5961C12.895 18.996 12.9104 19.629 13.3103 20.0099L15.1103 21.7241C15.4966 22.092 16.1035 22.092 16.4897 21.7241L20.6897 17.7241Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('user-check', UserCheck);
