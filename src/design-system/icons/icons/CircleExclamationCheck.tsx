import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CircleExclamationCheck: React.FC<IconComponentProps> = ({
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
        <><path d="M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.6655 21 17.0604 19.8412 18.7083 18M16 12.2857L17.8 14L22 10M12 8V13M12 16H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M11 22C15.1732 22 18.7494 19.4437 20.248 15.8114L19.869 16.1724C18.7104 17.2759 16.8897 17.2759 15.731 16.1724L13.931 14.4581C12.7312 13.3155 12.6849 11.4165 13.8276 10.2168C14.8832 9.10831 16.5844 8.98439 17.7834 9.87296L19.931 7.82759C19.9678 7.7926 20.0052 7.75872 20.0432 7.72595C18.4406 4.34117 14.9937 2 11 2C5.47715 2 1 6.47715 1 12C1 17.5228 5.47715 22 11 22ZM10 8C10 7.44772 10.4477 7 11 7C11.5523 7 12 7.44772 12 8V13C12 13.5523 11.5523 14 11 14C10.4477 14 10 13.5523 10 13V8ZM12 16C12 16.5523 11.5523 17 11 17C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15C11.5523 15 12 15.4477 12 16Z" fill={color}/>
<path d="M22.6897 10.7241C23.0896 10.3433 23.105 9.71028 22.7241 9.31035C22.3433 8.91042 21.7103 8.89498 21.3103 9.27586L17.8 12.619L16.6897 11.5616C16.2897 11.1807 15.6567 11.1961 15.2759 11.5961C14.895 11.996 14.9104 12.629 15.3103 13.0099L17.1103 14.7241C17.4966 15.092 18.1035 15.092 18.4897 14.7241L22.6897 10.7241Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-exclamation-check', CircleExclamationCheck);
