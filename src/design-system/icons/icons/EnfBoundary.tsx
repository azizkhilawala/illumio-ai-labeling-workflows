import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const EnfBoundary: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><circle cx="9" cy="9" r="9" fill={color}/>
<path d="M10.9384 8.96712L8.01722 6.51172V8.44009H2.8V9.49416H8.01722V11.4184L10.9384 8.96712Z" fill={color}/>
<path d="M11.5145 4.70593V13.6941H15.6V4.70593H11.5145ZM14.7829 9.64534L12.3316 12.0967V10.7975L14.7829 8.34614V9.64534ZM12.3316 8.34614L14.7829 5.89482V7.19402L12.3316 9.64534V8.34614ZM13.9208 5.60475L12.3316 7.19402V5.60475H13.9208ZM12.7851 12.7953L14.7829 10.7975V12.7953H12.7851Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('enf-boundary', EnfBoundary);
