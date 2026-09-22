import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Increase: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14186)">
<path d="M12.5567 7.09996L5.29334 14.3333L3.66667 12.69L10.92 5.46329L9.13334 3.66663H14.33L14.3333 8.90329L12.5567 7.09996Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14186">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('increase', Increase);
