import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const TrafficCone: React.FC<IconComponentProps> = ({
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
        <><path d="M8.88889 10H15.1111M6.94444 15H17.0556M3 20H21M5 20L10.3 6.37138C10.8287 5.01195 11.093 4.33223 11.4736 4.13412C11.8035 3.96237 12.1965 3.96237 12.5264 4.13412C12.907 4.33223 13.1713 5.01195 13.7 6.37138L19 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M18.5174 16L19.6841 19H21C21.5523 19 22 19.4477 22 20C22 20.5523 21.5523 21 21 21H19.0234C19.0079 21.0004 18.9925 21.0004 18.9771 21H5.02289C5.00751 21.0004 4.99208 21.0004 4.97663 21H3C2.44772 21 2 20.5523 2 20C2 19.4477 2.44772 19 3 19H4.31593L5.4826 16H18.5174Z" fill={color}/>
<path d="M17.7396 14L16.573 11H7.42704L6.26038 14H17.7396Z" fill={color}/>
<path d="M8.20482 9.00002H15.7952L14.6149 5.96501C14.3652 5.32275 14.1538 4.77921 13.9546 4.37511C13.7687 3.99794 13.4887 3.5077 12.9881 3.2471C12.3688 2.92471 11.6312 2.92471 11.0119 3.2471C10.5113 3.5077 10.2313 3.99794 10.0454 4.37511C9.84621 4.77921 9.63484 5.32276 9.38509 5.96503L8.20482 9.00002Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('traffic-cone', TrafficCone);
