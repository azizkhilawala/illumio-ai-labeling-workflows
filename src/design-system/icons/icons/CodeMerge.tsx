import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CodeMerge: React.FC<IconComponentProps> = ({
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
        <><path d="M5.5 8C6.88071 8 8 6.88071 8 5.5C8 4.11929 6.88071 3 5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8ZM5.5 8V16M5.5 8C5.5 10.2091 7.29086 12 9.5 12H16M5.5 16C4.11929 16 3 17.1193 3 18.5C3 19.8807 4.11929 21 5.5 21C6.88071 21 8 19.8807 8 18.5C8 17.1193 6.88071 16 5.5 16ZM16 12C16 13.3807 17.1193 14.5 18.5 14.5C19.8807 14.5 21 13.3807 21 12C21 10.6193 19.8807 9.5 18.5 9.5C17.1193 9.5 16 10.6193 16 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 5.5C3 3.567 4.567 2 6.5 2C8.433 2 10 3.567 10 5.5C10 7.04382 9.00046 8.35418 7.61323 8.81924C7.96972 10.0779 9.12717 11 10.5 11H14.1449C14.5752 9.55426 15.9145 8.5 17.5 8.5C19.433 8.5 21 10.067 21 12C21 13.933 19.433 15.5 17.5 15.5C15.9145 15.5 14.5752 14.4457 14.1449 13H10.5C9.37439 13 8.33566 12.6281 7.5 12.0004V15C7.5 15.0482 7.49659 15.0956 7.49 15.142C8.94088 15.569 10 16.9108 10 18.5C10 20.433 8.433 22 6.5 22C4.567 22 3 20.433 3 18.5C3 16.9108 4.05912 15.569 5.51001 15.142C5.50341 15.0956 5.5 15.0482 5.5 15V8.85506C4.05426 8.42479 3 7.08551 3 5.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('code-merge', CodeMerge);
