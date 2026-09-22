import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Delete: React.FC<IconComponentProps> = ({
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
<path d="M5.44333 13.1466C5.44421 13.4611 5.56952 13.7624 5.79187 13.9848C6.01422 14.2071 6.31555 14.3324 6.63 14.3333H11.37C11.6845 14.3324 11.9858 14.2071 12.2081 13.9848C12.4305 13.7624 12.5558 13.4611 12.5567 13.1466V6.03663H5.44333V13.1466ZM13.1467 4.25996H10.48V3.66663H7.52V4.25996H4.85333V5.44329H13.1467V4.25996Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('delete', Delete);
