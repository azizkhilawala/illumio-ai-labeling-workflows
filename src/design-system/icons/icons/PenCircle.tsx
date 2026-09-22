import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const PenCircle: React.FC<IconComponentProps> = ({
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
        <><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.90499 13.475C8.94031 13.2985 8.95796 13.2102 8.99025 13.1279C9.01891 13.0548 9.05608 12.9853 9.10098 12.921C9.15157 12.8484 9.21523 12.7848 9.34255 12.6574L13.5 8.5C14.0523 7.94772 14.9477 7.94772 15.5 8.5C16.0523 9.05228 16.0523 9.94772 15.5 10.5L11.3426 14.6574C11.2152 14.7848 11.1516 14.8484 11.079 14.899C11.0147 14.9439 10.9452 14.9811 10.8721 15.0097C10.7898 15.042 10.7015 15.0597 10.525 15.095L8.5 15.5L8.90499 13.475Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15.5904 8.41251C15.0442 7.8625 14.1586 7.8625 13.6124 8.4125L9.66463 12.3878C9.20425 12.8514 8.97406 13.0832 8.78814 13.346C8.6231 13.5793 8.48428 13.8303 8.37423 14.0944C8.25028 14.3919 8.17578 14.711 8.02678 15.3492L8.01304 15.4081C7.93349 15.7488 8.23015 16.0584 8.57116 15.9906C9.25281 15.8549 9.59363 15.7871 9.91146 15.6622C10.1936 15.5513 10.4617 15.4072 10.7102 15.2329C10.9901 15.0366 11.2358 14.7892 11.7271 14.2944L15.5904 10.4043C16.1365 9.85425 16.1365 8.96251 15.5904 8.41251Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('pen-circle', PenCircle);
