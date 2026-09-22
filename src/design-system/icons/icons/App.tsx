import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const App: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14227)">
<path d="M9.4 8.81951L10.7973 11.3511H8.10222L9.4 8.81951ZM8.68889 3.32617H10.1111L15.0889 13.4737H12.8702L9.368 6.50128L5.86578 13.4737H3.71111L8.68889 3.32617Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14227">
<rect width="12.8" height="12.8" fill={color} transform="translate(3 2)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('app', App);
