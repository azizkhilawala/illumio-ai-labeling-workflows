import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ChevronSelectorHorizontalDot: React.FC<IconComponentProps> = ({
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
        <><path d="M9 7L4 12L9 17M15 7L20 12L15 17M12 12H12.01M12.5 12C12.5 12.2761 12.2761 12.5 12 12.5C11.7239 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.7239 11.5 12 11.5C12.2761 11.5 12.5 11.7239 12.5 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M9.70711 7.70711C10.0976 7.31658 10.0976 6.68342 9.70711 6.29289C9.31658 5.90237 8.68342 5.90237 8.29289 6.29289L3.29289 11.2929C2.90237 11.6834 2.90237 12.3166 3.29289 12.7071L8.29289 17.7071C8.68342 18.0976 9.31658 18.0976 9.70711 17.7071C10.0976 17.3166 10.0976 16.6834 9.70711 16.2929L5.41421 12L9.70711 7.70711Z" fill={color}/>
<path d="M15.7071 6.29289C15.3166 5.90237 14.6834 5.90237 14.2929 6.29289C13.9024 6.68342 13.9024 7.31658 14.2929 7.70711L18.5858 12L14.2929 16.2929C13.9024 16.6834 13.9024 17.3166 14.2929 17.7071C14.6834 18.0976 15.3166 18.0976 15.7071 17.7071L20.7071 12.7071C21.0976 12.3166 21.0976 11.6834 20.7071 11.2929L15.7071 6.29289Z" fill={color}/>
<path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('chevron-selector-horizontal-dot', ChevronSelectorHorizontalDot);
