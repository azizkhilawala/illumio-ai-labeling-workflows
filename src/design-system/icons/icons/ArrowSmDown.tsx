import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowSmDown: React.FC<IconComponentProps> = ({
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
        <><path d="M12 6V18M12 18L7 13M12 18L17 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12.0001 5C12.5524 5 13.0001 5.44772 13.0001 6V15.5858L16.293 12.2929C16.6835 11.9024 17.3167 11.9024 17.7072 12.2929C18.0978 12.6834 18.0978 13.3166 17.7072 13.7071L12.7072 18.7071C12.3167 19.0976 11.6835 19.0976 11.293 18.7071L6.29302 13.7071C5.90249 13.3166 5.90249 12.6834 6.29302 12.2929C6.68354 11.9024 7.3167 11.9024 7.70723 12.2929L11.0001 15.5858V6C11.0001 5.44772 11.4478 5 12.0001 5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-sm-down', ArrowSmDown);
