import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const HighDefinition: React.FC<IconComponentProps> = ({
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
        <><path d="M6 12H10M6 9V15M10 9V15M13.5 9.5V14.5C13.5 14.7761 13.7239 15 14 15H15C16.6569 15 18 13.6569 18 12C18 10.3431 16.6569 9 15 9H14C13.7239 9 13.5 9.22386 13.5 9.5ZM5.2 19H18.8C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.71569 21.2843 5.40973 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.07989 5 3.51984 5 3.09202 5.21799C2.71569 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M14.5 14V10H15C16.1046 10 17 10.8954 17 12C17 13.1046 16.1046 14 15 14H14.5Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M4 5C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5H4ZM7 9C7 8.44771 6.55228 8 6 8C5.44772 8 5 8.44771 5 9V15C5 15.5523 5.44772 16 6 16C6.55228 16 7 15.5523 7 15V13H9V15C9 15.5523 9.44772 16 10 16C10.5523 16 11 15.5523 11 15V9C11 8.44771 10.5523 8 10 8C9.44772 8 9 8.44771 9 9V11H7V9ZM14 8C13.1716 8 12.5 8.67157 12.5 9.5V14.5C12.5 15.3284 13.1716 16 14 16H15C17.2091 16 19 14.2091 19 12C19 9.79086 17.2091 8 15 8H14Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('high-definition', HighDefinition);
