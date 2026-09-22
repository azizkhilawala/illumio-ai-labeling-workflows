import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Corporate: React.FC<IconComponentProps> = ({
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
<path d="M15.6 2.80005H2.8V15.6H15.6V2.80005Z" fill={color}/>
<path d="M11.4857 2.80005H6.91429V6.45719H11.4857V2.80005Z" fill={color}/>
<path d="M8.28572 11.0286H3.71429V14.6857H8.28572V11.0286Z" fill={color}/>
<path d="M14.6857 11.0286H10.1143V14.6857H14.6857V11.0286Z" fill={color}/>
<path d="M6 8.74292V12.8572V8.74292Z" fill={color}/>
<path d="M6 8.74292V12.8572" stroke={color}/>
<path d="M12.4 8.74292V12.8572V8.74292Z" fill={color}/>
<path d="M12.4 8.74292V12.8572" stroke={color}/>
<path d="M9.2 4.62866V8.74295" stroke={color}/>
<path d="M2.8 8.74292H15.6" stroke={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('corporate', Corporate);
