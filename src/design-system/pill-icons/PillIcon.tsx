'use client';

import React from 'react';
import type { PillIconProps, LabelType } from './types';
import { getPillIcon } from './registry';
import './pill-icon.css';

// Import all icons to register them
import './icons';

// Label type to CSS class mapping
const LABEL_TYPE_CLASSES: Record<LabelType, string> = {
  app: 'ds-pill-icon--app',
  role: 'ds-pill-icon--role',
  env: 'ds-pill-icon--env',
  loc: 'ds-pill-icon--loc',
};

export const PillIcon: React.FC<PillIconProps> = ({
  name,
  size = 18,
  bgColor,
  iconColor,
  labelType,
  className = '',
}) => {
  const IconComponent = getPillIcon(name);

  if (!IconComponent) {
    console.warn(`PillIcon: Unknown icon name "${name}"`);
    return null;
  }

  // Build class list
  const classes = [
    'ds-pill-icon',
    labelType ? LABEL_TYPE_CLASSES[labelType] : 'ds-pill-icon--default',
    className,
  ].filter(Boolean).join(' ');

  // Use provided colors or fall back to CSS custom properties
  const finalBgColor = bgColor || 'var(--pill-icon-bg, var(--lightning-bluegray-600))';
  const finalIconColor = iconColor || 'var(--pill-icon-fg, var(--lightning-contrast-white))';

  return (
    <IconComponent
      size={size}
      bgColor={finalBgColor}
      iconColor={finalIconColor}
      className={classes}
    />
  );
};

export default PillIcon;
