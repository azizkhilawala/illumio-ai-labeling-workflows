import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Cloche: React.FC<IconComponentProps> = ({
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
        <><path d="M12 9C14.5 9 16 10 17 12M12 6C7.58172 6 4 9.58172 4 14C4 15.4571 4.38958 16.8233 5.07026 18M12 6C16.4183 6 20 9.58172 20 14C20 15.4571 19.6104 16.8233 18.9297 18M12 6C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 10.5 4.5C10.5 5.32843 11.1716 6 12 6ZM4.5 21H19.5C20.3284 21 21 20.3284 21 19.5C21 18.6716 20.3284 18 19.5 18H4.5C3.67157 18 3 18.6716 3 19.5C3 20.3284 3.67157 21 4.5 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M14.5 4.5C14.5 4.78492 14.4523 5.05872 14.3645 5.31384C18.1881 6.3522 21 9.84772 21 14C21 14.6874 20.9229 15.3568 20.777 16H3.22302C3.07706 15.3568 3 14.6874 3 14C3 9.84772 5.81195 6.3522 9.63545 5.31383C9.54766 5.05871 9.5 4.78492 9.5 4.5C9.5 3.11929 10.6193 2 12 2C13.3807 2 14.5 3.11929 14.5 4.5ZM12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10C13.1156 10 13.9217 10.2222 14.5384 10.6017C15.1539 10.9804 15.6662 11.5686 16.1056 12.4472C16.3526 12.9412 16.9532 13.1414 17.4472 12.8944C17.9412 12.6474 18.1414 12.0468 17.8944 11.5528C17.3338 10.4314 16.5961 9.51955 15.5866 8.89834C14.5783 8.27785 13.3844 8 12 8Z" fill={color}/>
<path d="M4 18C2.89543 18 2 18.8954 2 20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18H4Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cloche', Cloche);
