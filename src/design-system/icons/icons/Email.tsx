import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Email: React.FC<IconComponentProps> = ({
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
<path d="M14.3033 5.84814L11.0332 8.64827L9.00309 10.315L7.003 8.6716L3.70286 5.84814C3.68166 5.91044 3.67041 5.97569 3.66952 6.04149V11.9651C3.66571 12.0028 3.66571 12.0407 3.66952 12.0784C3.6953 12.2262 3.77218 12.3602 3.88672 12.4571C4.00127 12.554 4.1462 12.6076 4.29622 12.6084H13.6933C13.8277 12.6072 13.9583 12.5638 14.0666 12.4842C14.1749 12.4046 14.2554 12.293 14.2967 12.1651C14.32 12.0998 14.3324 12.0311 14.3333 11.9617V6.04149C14.3335 5.97587 14.3234 5.91062 14.3033 5.84814Z" fill={color}/>
<path d="M8.08967 8.80163L9.00304 9.545L9.91975 8.7983L10.3831 8.42161L13.8766 5.42148C13.8184 5.40275 13.7577 5.39264 13.6966 5.39148H4.3095C4.24835 5.3926 4.1877 5.4027 4.12949 5.42148L7.62632 8.42161L8.08967 8.80163Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('email', Email);
