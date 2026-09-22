'use client';

import React from 'react';
import type { IllustrationProps, IllustrationName } from './types';
import { illustrationRegistry } from './registry';

/**
 * Illustration Component
 *
 * Renders illustrations by name from the registry.
 * Unlike icons, illustrations preserve their original colors.
 *
 * @example
 * <Illustration name="empty-state" width={200} />
 * <Illustration name="error" height={150} />
 */
export const Illustration: React.FC<IllustrationProps> = ({
  name,
  width,
  height,
  className = '',
  ...props
}) => {
  const IllustrationComponent = illustrationRegistry[name as string];

  if (!IllustrationComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Illustration "${name}" not found in registry`);
    }
    return null;
  }

  return (
    <IllustrationComponent
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
};

// Helper to check if an illustration exists
export function hasIllustration(name: string): name is IllustrationName {
  return name in illustrationRegistry;
}
