import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Comment: React.FC<PillIconComponentProps> = ({
  size = 18,
  bgColor = 'var(--lightning-bluegray-600)',
  iconColor = 'var(--lightning-contrast-white)',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-pill-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="9" cy="9" r="9" fill={bgColor} />
      {/* Icon content */}
      <path d="M12.36 4.38208H5.64C5.11664 4.38208 4.61471 4.58998 4.24464 4.96006C3.87457 5.33013 3.66667 5.83205 3.66667 6.35541V10.1454C3.66667 11.6154 4.47 12.0454 5.50667 12.0454H6.12C5.90622 12.5842 5.53288 13.0448 5.05 13.3654C4.66 13.6721 6.68333 14.0587 8.58667 12.1187H12.36C12.8834 12.1187 13.3853 11.9108 13.7554 11.5408C14.1254 11.1707 14.3333 10.6688 14.3333 10.1454V6.35541C14.3333 5.83205 14.1254 5.33013 13.7554 4.96006C13.3853 4.58998 12.8834 4.38208 12.36 4.38208ZM12 6.95875H6.05V6.00541H12V6.95875ZM12 8.71208H6.05V7.76541H12V8.71208ZM12 10.4487H6.05V9.50208H12V10.4487Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('comment', Comment);
