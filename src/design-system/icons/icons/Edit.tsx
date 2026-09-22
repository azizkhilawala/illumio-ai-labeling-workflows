import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Edit: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14181)">
<path d="M10.4421 5.61035L3.67536 12.4071V14.3333H5.62821L12.385 7.55322L10.4421 5.61035Z" fill={color}/>
<path d="M12.3812 3.66659L11.1017 4.94653L13.0451 6.8893L14.3246 5.60936L12.3812 3.66659Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14181">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('edit', Edit);
