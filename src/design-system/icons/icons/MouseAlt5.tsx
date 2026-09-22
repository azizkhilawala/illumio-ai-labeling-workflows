import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MouseAlt5: React.FC<IconComponentProps> = ({
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
        <><path d="M12 3V9M12 3C9.01852 3 7.14819 5.22231 6.38902 6.35404C6.28972 6.50206 6.24007 6.57608 6.16864 6.73881C6.11892 6.85211 6.05316 7.06819 6.03134 7.18997C6 7.36491 6 7.49508 6 7.75542V15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15V7.75542C18 7.49508 18 7.36491 17.9687 7.18997C17.9468 7.06819 17.8811 6.85211 17.8314 6.73881C17.7599 6.57608 17.7103 6.50206 17.611 6.35404C16.8518 5.22231 14.9815 3 12 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 2.07239C8.08238 2.50072 6.2802 4.72123 5.55858 5.79697L5.55467 5.8028C5.44999 5.95884 5.36016 6.09273 5.25299 6.33691C5.17156 6.52243 5.08275 6.81422 5.04703 7.01365C4.9998 7.2773 4.9999 7.48823 5.00001 7.72124L5.00002 15C5.00002 18.866 8.13403 22 12 22C15.866 22 19 18.866 19 15L19 7.72125C19.0001 7.48824 19.0002 7.2773 18.953 7.01365C18.9173 6.81422 18.8285 6.52243 18.7471 6.33691C18.6399 6.09274 18.5501 5.95885 18.4454 5.80282L18.4415 5.79697C17.7198 4.72122 15.9176 2.5007 13 2.07239V9.00001C13 9.55229 12.5523 10 12 10C11.4477 10 11 9.55229 11 9.00001V2.07239Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('mouse-alt-5', MouseAlt5);
