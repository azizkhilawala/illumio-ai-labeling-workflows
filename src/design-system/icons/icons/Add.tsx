import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Add: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14215)">
<path d="M8.39022 15.0888V10.4097H3.71111V8.39017H8.39022V3.71106H10.4098V8.39017H15.0889V10.4097H10.4098V15.0888H8.39022Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14215">
<rect width="12.8" height="12.8" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('add', Add);
