import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Scarecrow: React.FC<IconComponentProps> = ({
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
        <><path d="M9 6L10 3H14L15 6M12 19V21M18 12H21M6 12H3M10 6C9.68612 6.41785 9.5 6.93716 9.5 7.5C9.5 8.88071 10.6193 10 12 10C13.3807 10 14.5 8.88071 14.5 7.5C14.5 6.9372 14.314 6.41783 14.0002 6M7 6H17M6 10H18V14H14.5L15 19H9L9.5 14H6V10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M9.05132 2.68377C9.18743 2.27543 9.56957 2 10 2H14C14.4304 2 14.8126 2.27543 14.9487 2.68377L15.7208 5H17C17.5523 5 18 5.44772 18 6C18 6.55228 17.5523 7 17 7H15.4644C15.4879 7.1634 15.5 7.33035 15.5 7.5C15.5 8.0368 15.3792 8.54537 15.1632 9H18C18.5523 9 19 9.44772 19 10V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H19V14C19 14.5523 18.5523 15 18 15H15.605L15.995 18.9005C16.0231 19.1816 15.931 19.4615 15.7415 19.671C15.5519 19.8805 15.2825 20 15 20H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V20H9C8.71747 20 8.44813 19.8805 8.25855 19.671C8.06897 19.4615 7.97685 19.1816 8.00496 18.9005L8.39501 15H6C5.44772 15 5 14.5523 5 14V13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H5V10C5 9.44772 5.44772 9 6 9H8.83682C8.62085 8.54537 8.5 8.0368 8.5 7.5C8.5 7.33034 8.51213 7.16338 8.53557 7H7C6.44772 7 6 6.55228 6 6C6 5.44772 6.44772 5 7 5H8.27924L9.05132 2.68377ZM10.5851 7C10.53 7.15608 10.5 7.32417 10.5 7.5C10.5 8.32843 11.1716 9 12 9C12.8284 9 13.5 8.32843 13.5 7.5C13.5 7.32414 13.4701 7.15605 13.4149 7H10.5851Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('scarecrow', Scarecrow);
