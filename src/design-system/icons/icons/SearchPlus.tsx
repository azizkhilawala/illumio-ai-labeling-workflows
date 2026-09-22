import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const SearchPlus: React.FC<IconComponentProps> = ({
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
        <><path d="M15.8053 15.8013L21 21M10.5 7.5V13.5M7.5 10.5H13.5M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M10.5 2C5.80558 2 2 5.80558 2 10.5C2 15.1944 5.80558 19 10.5 19C12.4869 19 14.3145 18.3183 15.7618 17.176L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L17.176 15.7618C18.3183 14.3145 19 12.4869 19 10.5C19 5.80558 15.1944 2 10.5 2ZM11.5 7.5C11.5 6.94772 11.0523 6.5 10.5 6.5C9.94772 6.5 9.5 6.94772 9.5 7.5V9.5H7.5C6.94772 9.5 6.5 9.94772 6.5 10.5C6.5 11.0523 6.94772 11.5 7.5 11.5H9.5V13.5C9.5 14.0523 9.94772 14.5 10.5 14.5C11.0523 14.5 11.5 14.0523 11.5 13.5V11.5H13.5C14.0523 11.5 14.5 11.0523 14.5 10.5C14.5 9.94772 14.0523 9.5 13.5 9.5H11.5V7.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('search-plus', SearchPlus);
