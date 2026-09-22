import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Gold: React.FC<IconComponentProps> = ({
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
        <><path d="M3.875 14H9.125L10 19H3L3.875 14Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.375 5H14.625L15.5 10H8.5L9.375 5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.875 14H20.125L21 19H14L14.875 14Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8.38998 4.82762C8.47372 4.34911 8.88923 4 9.37501 4H14.625C15.1108 4 15.5263 4.34911 15.61 4.82762L16.485 9.82762C16.536 10.1186 16.4556 10.4171 16.2656 10.6433C16.0756 10.8694 15.7954 11 15.5 11H8.50001C8.20464 11 7.92438 10.8694 7.73438 10.6433C7.54437 10.4171 7.46406 10.1186 7.51498 9.82762L8.38998 4.82762ZM2.88998 13.8276C2.97372 13.3491 3.38923 13 3.87501 13H9.12501C9.61079 13 10.0263 13.3491 10.11 13.8276L10.985 18.8276C11.036 19.1186 10.9556 19.4171 10.7656 19.6433C10.5756 19.8694 10.2954 20 10 20H3.00001C2.70464 20 2.42438 19.8694 2.23438 19.6433C2.04437 19.4171 1.96406 19.1186 2.01498 18.8276L2.88998 13.8276ZM13.89 13.8276C13.9737 13.3491 14.3892 13 14.875 13H20.125C20.6108 13 21.0263 13.3491 21.11 13.8276L21.985 18.8276C22.036 19.1186 21.9556 19.4171 21.7656 19.6433C21.5756 19.8694 21.2954 20 21 20H14C13.7046 20 13.4244 19.8694 13.2344 19.6433C13.0444 19.4171 12.9641 19.1186 13.015 18.8276L13.89 13.8276Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('gold', Gold);
