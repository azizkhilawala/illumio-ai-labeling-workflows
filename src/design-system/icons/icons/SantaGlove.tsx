import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const SantaGlove: React.FC<IconComponentProps> = ({
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
        <><path d="M5 17H17M5 17C3.89543 17 3 17.8954 3 19C3 20.1046 3.89543 21 5 21H17C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17M5 17V10M17 17L17 14L20.0783 11.5373C21.1492 10.6806 21.3347 9.11287 20.5118 8.01574C19.6834 6.91117 18.1046 6.67157 17 7.5M17 9.42857V9C17 5.68629 14.3137 3 11 3C7.68629 3 5 5.68629 5 9V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M4 9C4 5.13401 7.13401 2 11 2C13.8611 2 16.3213 3.71648 17.4069 6.17582C18.8015 5.72147 20.3911 6.18808 21.3118 7.41574C22.4528 8.93713 22.2033 11.118 20.703 12.3182L18 14.4806V15.126C17.6804 15.0438 17.3453 15 17 15H5C4.6547 15 4.31962 15.0438 4 15.126V9Z" fill={color}/>
<path d="M5 16C3.34315 16 2 17.3431 2 19C2 20.6569 3.34315 22 5 22H17C18.6569 22 20 20.6569 20 19C20 17.3431 18.6569 16 17 16H5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('santa-glove', SantaGlove);
