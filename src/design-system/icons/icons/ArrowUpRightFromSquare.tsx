import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowUpRightFromSquare: React.FC<IconComponentProps> = ({
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
        <><path d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M14.5 4C14.5 3.44772 14.9477 3 15.5 3H20C20.5523 3 21 3.44772 21 4V8.5C21 9.05228 20.5523 9.5 20 9.5C19.4477 9.5 19 9.05228 19 8.5V6.41421L12.7071 12.7071C12.3166 13.0976 11.6834 13.0976 11.2929 12.7071C10.9024 12.3166 10.9024 11.6834 11.2929 11.2929L17.5858 5H15.5C14.9477 5 14.5 4.55228 14.5 4Z" fill={color}/>
<path d="M14.1213 14.1213L17.7539 10.4888C18.3035 11.109 19.1061 11.5 20 11.5V18C20 19.6569 18.6569 21 17 21H6C4.34315 21 3 19.6569 3 18V7C3 5.34315 4.34315 4 6 4H12.5C12.5 4.89391 12.891 5.69651 13.5112 6.24612L9.87868 9.87868C8.70711 11.0503 8.70711 12.9497 9.87868 14.1213C11.0503 15.2929 12.9497 15.2929 14.1213 14.1213Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-up-right-from-square', ArrowUpRightFromSquare);
