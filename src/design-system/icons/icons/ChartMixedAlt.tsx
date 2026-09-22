import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ChartMixedAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M21 3L14 9L10 5L3 11M4.5 21C3.67157 21 3 20.3284 3 19.5V17.5C3 16.6716 3.67157 16 4.5 16C5.32843 16 6 16.6716 6 17.5V19.5C6 20.3284 5.32843 21 4.5 21ZM11.5 21C10.6716 21 10 20.3284 10 19.5V14.5C10 13.6716 10.6716 13 11.5 13C12.3284 13 13 13.6716 13 14.5V19.5C13 20.3284 12.3284 21 11.5 21ZM18.5 21C17.6716 21 17 20.3284 17 19.5V16.5C17 15.6716 17.6716 15 18.5 15C19.3284 15 20 15.6716 20 16.5V19.5C20 20.3284 19.3284 21 18.5 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M21.6508 3.75927C22.0701 3.39985 22.1187 2.76855 21.7593 2.34923C21.3999 1.9299 20.7686 1.88134 20.3492 2.24076L14.0523 7.63811L10.7071 4.29291C10.3376 3.92342 9.74597 3.9007 9.34923 4.24076L2.34923 10.2408C1.9299 10.6002 1.88134 11.2315 2.24076 11.6508C2.60018 12.0701 3.23148 12.1187 3.65081 11.7593L9.94771 6.36193L13.2929 9.70712C13.6624 10.0766 14.2541 10.0993 14.6508 9.75927L21.6508 3.75927Z" fill={color}/>
<path d="M11.5 12C10.1193 12 9 13.1193 9 14.5V19.5C9 20.8807 10.1193 22 11.5 22C12.8807 22 14 20.8807 14 19.5V14.5C14 13.1193 12.8807 12 11.5 12Z" fill={color}/>
<path d="M16 16.5C16 15.1193 17.1193 14 18.5 14C19.8807 14 21 15.1193 21 16.5V19.5C21 20.8807 19.8807 22 18.5 22C17.1193 22 16 20.8807 16 19.5V16.5Z" fill={color}/>
<path d="M4.5 15C3.11929 15 2 16.1193 2 17.5V19.5C2 20.8807 3.11929 22 4.5 22C5.88071 22 7 20.8807 7 19.5V17.5C7 16.1193 5.88071 15 4.5 15Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('chart-mixed-alt', ChartMixedAlt);
