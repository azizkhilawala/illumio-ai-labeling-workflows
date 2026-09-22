import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LiraSign: React.FC<IconComponentProps> = ({
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
        <><path d="M19 13C19 17.4183 14.5228 21 9 21V3M15 10L5 12M15 6L5 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M9.00019 2C9.55248 2 10.0002 2.44772 10.0002 3V5.9802L14.8041 5.01942C15.3456 4.91111 15.8725 5.26232 15.9808 5.80388C16.0891 6.34544 15.7379 6.87227 15.1963 6.98058L10.0002 8.0198V9.9802L14.8041 9.01942C15.3456 8.91111 15.8725 9.26232 15.9808 9.80388C16.0891 10.3454 15.7379 10.8723 15.1963 10.9806L10.0002 12.0198V19.9581C14.6726 19.5629 18.0002 16.4293 18.0002 13C18.0002 12.4477 18.4479 12 19.0002 12C19.5525 12 20.0002 12.4477 20.0002 13C20.0002 18.1673 14.8556 22 9.00019 22C8.44791 22 8.00019 21.5523 8.00019 21V12.4198L5.19631 12.9806C4.65475 13.0889 4.12792 12.7377 4.01961 12.1961C3.9113 11.6546 4.26252 11.1277 4.80408 11.0194L8.00019 10.3802V8.4198L5.19631 8.98058C4.65475 9.08889 4.12792 8.73768 4.01961 8.19612C3.9113 7.65456 4.26252 7.12773 4.80408 7.01942L8.00019 6.3802V3C8.00019 2.44772 8.44791 2 9.00019 2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('lira-sign', LiraSign);
