import React from 'react';
import './icon.css';
import { iconRegistry } from './registry';
import type { IconProps, IconVariant, IconSize } from './types';

export const Icon: React.FC<IconProps> = ({
  name,
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  const IconComponent = iconRegistry[name];

  if (!IconComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Icon "${name}" not found in registry`);
    }
    return null;
  }

  return (
    <IconComponent
      variant={variant}
      size={size}
      color={color}
      className={className}
    />
  );
};

export type { IconProps, IconVariant, IconSize };
