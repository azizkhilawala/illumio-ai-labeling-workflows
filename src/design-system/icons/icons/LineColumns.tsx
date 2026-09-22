import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LineColumns: React.FC<IconComponentProps> = ({
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
        <><path d="M3 6H10M3 10H10M3 14H10M3 18H10M14 6L21 6.0006M14 10L21 10.0006M14 14L21 14.0006M14 18L21 18.0006" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 6C2 5.44772 2.44772 5 3 5H10C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7H3C2.44772 7 2 6.55228 2 6ZM13 5.99991C13 5.44763 13.4478 4.99995 14.0001 5L21.0001 5.0006C21.5524 5.00065 22 5.4484 22 6.00069C22 6.55297 21.5522 7.00065 20.9999 7.0006L13.9999 7C13.4476 6.99995 13 6.5522 13 5.99991ZM2 10C2 9.44772 2.44772 9 3 9H10C10.5523 9 11 9.44772 11 10C11 10.5523 10.5523 11 10 11H3C2.44772 11 2 10.5523 2 10ZM13 9.99991C13 9.44763 13.4478 8.99995 14.0001 9L21.0001 9.0006C21.5524 9.00065 22 9.4484 22 10.0007C22 10.553 21.5522 11.0006 20.9999 11.0006L13.9999 11C13.4476 11 13 10.5522 13 9.99991ZM2 14C2 13.4477 2.44772 13 3 13H10C10.5523 13 11 13.4477 11 14C11 14.5523 10.5523 15 10 15H3C2.44772 15 2 14.5523 2 14ZM13 13.9999C13 13.4476 13.4478 13 14.0001 13L21.0001 13.0006C21.5524 13.0006 22 13.4484 22 14.0007C22 14.553 21.5522 15.0006 20.9999 15.0006L13.9999 15C13.4476 15 13 14.5522 13 13.9999ZM2 18C2 17.4477 2.44772 17 3 17H10C10.5523 17 11 17.4477 11 18C11 18.5523 10.5523 19 10 19H3C2.44772 19 2 18.5523 2 18ZM13 17.9999C13 17.4476 13.4478 17 14.0001 17L21.0001 17.0006C21.5524 17.0006 22 17.4484 22 18.0007C22 18.553 21.5522 19.0006 20.9999 19.0006L13.9999 19C13.4476 19 13 18.5522 13 17.9999Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('line-columns', LineColumns);
